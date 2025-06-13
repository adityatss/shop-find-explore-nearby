
import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Package } from 'lucide-react';
import { Shop, Item } from '../types';

interface EditShopProps {
  shop: Shop;
  onUpdateShop: (updatedShop: Shop) => void;
  onCancel: () => void;
}

const EditShop: React.FC<EditShopProps> = ({ shop, onUpdateShop, onCancel }) => {
  const [items, setItems] = useState<Item[]>(shop.items);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState<number>(1);

  const handleAddItem = () => {
    if (newItemName.trim()) {
      const newItem: Item = {
        id: `item_${Date.now()}`,
        name: newItemName.trim(),
        quantity: newItemQuantity
      };
      setItems([...items, newItem]);
      setNewItemName('');
      setNewItemQuantity(1);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleUpdateItemQuantity = (itemId: string, newQuantity: number) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, quantity: Math.max(0, newQuantity) }
        : item
    ));
  };

  const handleSave = () => {
    const updatedShop: Shop = {
      ...shop,
      items: items
    };
    onUpdateShop(updatedShop);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onCancel}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to shop
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Edit Shop Items</h1>
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              <Save size={18} className="mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Shop Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{shop.name}</h2>
          <p className="text-gray-600">{shop.description}</p>
        </div>

        {/* Add New Item */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Item</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Item name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Quantity"
              min="1"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 1)}
              className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddItem}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Plus size={18} className="mr-2" />
              Add Item
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Current Items ({items.length})
          </h3>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No items added yet</p>
              <p className="text-gray-400 text-sm">Add your first item above</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Quantity:</span>
                      <input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItemQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="w-20 px-2 py-1 border border-gray-200 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.quantity > 10 
                        ? 'bg-green-100 text-green-800' 
                        : item.quantity > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.quantity > 10 ? 'In Stock' : item.quantity > 0 ? 'Limited' : 'Out of Stock'}
                    </span>
                    
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditShop;
