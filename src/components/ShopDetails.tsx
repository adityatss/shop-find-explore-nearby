
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Search, Package } from 'lucide-react';
import { Shop, Item } from '../types';

interface ShopDetailsProps {
  shop: Shop;
  onBack: () => void;
}

const ShopDetails: React.FC<ShopDetailsProps> = ({ shop, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredItems = shop.items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to shops
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Shop Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative">
            {shop.posterUrl ? (
              <img 
                src={shop.posterUrl} 
                alt={shop.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package size={64} className="text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{shop.address}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              {shop.description}
            </p>
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Items ({shop.items.length})
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Items Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'No items match your search' : 'No items available'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.quantity > 10 
                        ? 'bg-green-100 text-green-800' 
                        : item.quantity > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.quantity > 10 ? 'In Stock' : item.quantity > 0 ? 'Limited' : 'Out of Stock'}
                    </span>
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

export default ShopDetails;
