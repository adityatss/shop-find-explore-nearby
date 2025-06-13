
import React from 'react';
import { MapPin, Package } from 'lucide-react';
import { Shop, UserLocation } from '../types';
import { calculateDistance } from '../utils/distance';

interface ShopCardProps {
  shop: Shop;
  userLocation: UserLocation | null;
  onClick: () => void;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop, userLocation, onClick }) => {
  const distance = userLocation 
    ? calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        shop.location.latitude,
        shop.location.longitude
      )
    : null;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
        {shop.posterUrl ? (
          <img 
            src={shop.posterUrl} 
            alt={shop.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={48} className="text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {shop.name}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">
            {distance !== null ? `${distance.toFixed(1)} km away` : shop.address}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {shop.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {shop.items.length} items available
          </span>
          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            View Shop
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
