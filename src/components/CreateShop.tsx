
import React, { useState } from 'react';
import { ArrowLeft, Upload, MapPin, Plus, X } from 'lucide-react';
import { Shop, UserLocation, Item } from '../types';

interface CreateShopProps {
  onCreateShop: (shop: Omit<Shop, 'id'>) => void;
  onCancel: () => void;
  userLocation: UserLocation | null;
}

const CreateShop: React.FC<CreateShopProps> = ({ onCreateShop, onCancel, userLocation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [location, setLocation] = useState(userLocation || { latitude: 0, longitude: 0 });
  const [items, setItems] = useState<Omit<Item, 'id'>[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);

  const handleAddItem = () => {
    if (newItemName.trim()) {
      setItems([...items, {
        name: newItemName.trim(),
        quantity: newItemQuantity
      }]);
      setNewItemName('');
      setNewItemQuantity(1);
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const shop: Omit<Shop, 'id'> = {
      name,
      description,
      address,
      posterUrl: posterUrl || undefined,
      location,
      items: items.map((item, index) => ({
        ...item,
        id: `item-${Date.now()}-${index}`
      })),
      owner: 'Current User' // In a real app, this would be the authenticated user
    };

    onCreateShop(shop);
  };

  const useCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onCancel}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Cancel
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Your Shop</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shop Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter shop name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter shop address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your shop and what you offer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poster Image URL (Optional)
              </label>
              <input
                type="url"
                value={posterUrl}
                onChange={(e) => setPosterUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="any"
                  value={location.latitude}
                  onChange={(e) => setLocation({...location, latitude: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Latitude"
                />
                <input
                  type="number"
                  step="any"
                  value={location.longitude}
                  onChange={(e) => setLocation({...location, longitude: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Longitude"
                />
              </div>
              <button
                type="button"
                onClick={useCurrentLocation}
                className="mt-2 flex items-center text-blue-600 hover:text-blue-700 text-sm"
              >
                <MapPin size={16} className="mr-1" />
                Use current location
              </button>
            </div>

            {/* Items */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Shop Items
              </label>
              
              {/* Add Item Form */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Item name"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    min="0"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 0)}
                    placeholder="Quantity"
                    className="w-32 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Add
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 ml-2">({item.quantity} available)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {items.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No items added yet. Add items to your shop above.
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name || !description || !address}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Create Shop
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateShop;
