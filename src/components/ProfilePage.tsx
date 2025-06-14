
import React from 'react';
import { User, Store, MapPin, Calendar, Edit, Trash2 } from 'lucide-react';
import { Switch } from './ui/switch';
import { Shop } from '../types';

interface ProfilePageProps {
  currentUserId: string;
  userShops: Shop[];
  onEditShop: (shop: Shop) => void;
  onDeleteShop: (shopId: string) => void;
  onViewShop: (shop: Shop) => void;
  onToggleShopStatus?: (shopId: string, isOpen: boolean) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ 
  currentUserId, 
  userShops, 
  onEditShop, 
  onDeleteShop, 
  onViewShop,
  onToggleShopStatus
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <User size={48} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
              <p className="text-gray-600">User ID: {currentUserId.slice(-8)}</p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Store size={20} className="text-blue-600" />
                  <span className="text-lg font-semibold text-gray-800">
                    {userShops.length} Shop{userShops.length !== 1 ? 's' : ''} Created
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User's Shops */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Store size={28} className="mr-3 text-purple-600" />
            Your Shops
          </h2>

          {userShops.length === 0 ? (
            <div className="text-center py-12">
              <Store size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No shops created yet</h3>
              <p className="text-gray-600 mb-6">Start by creating your first shop to build your business presence!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userShops.map((shop) => (
                <div key={shop.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{shop.name}</h3>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {shop.category}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${shop.isOpen !== false ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className={`text-sm font-medium ${shop.isOpen !== false ? 'text-green-700' : 'text-red-700'}`}>
                            {shop.isOpen !== false ? 'Open' : 'Closed'}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{shop.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-gray-500" />
                          <span className="text-gray-700">{shop.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Store size={16} className="text-gray-500" />
                          <span className="text-gray-700">{shop.items.length} items</span>
                        </div>
                      </div>

                      {/* Shop Status Toggle */}
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Shop Status:</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm ${shop.isOpen !== false ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                            Closed
                          </span>
                          <Switch
                            checked={shop.isOpen !== false}
                            onCheckedChange={(checked) => onToggleShopStatus?.(shop.id, checked)}
                          />
                          <span className={`text-sm ${shop.isOpen !== false ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                            Open
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => onViewShop(shop)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onEditShop(shop)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => onDeleteShop(shop.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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

export default ProfilePage;
