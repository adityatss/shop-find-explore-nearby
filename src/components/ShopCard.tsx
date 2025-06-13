
import React from 'react';
import { MapPin, Package, ArrowRight } from 'lucide-react';
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
      className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-white/20 hover:border-purple-200 transform hover:scale-105 hover:-translate-y-2"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Image section */}
      <div className="aspect-video bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
        {shop.posterUrl ? (
          <img 
            src={shop.posterUrl} 
            alt={shop.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200"></div>
            <Package size={56} className="text-white relative z-10 drop-shadow-lg" />
          </div>
        )}
        
        {/* Floating distance badge */}
        {distance !== null && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 shadow-lg">
            {distance.toFixed(1)} km
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300 flex-1">
            {shop.name}
          </h3>
          <ArrowRight size={20} className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2" />
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-2">
            <MapPin size={12} className="text-white" />
          </div>
          <span className="text-sm">
            {distance !== null ? `${distance.toFixed(1)} km away` : shop.address}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
          {shop.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">
              {shop.items.length} items available
            </span>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300">
            Explore
          </div>
        </div>
      </div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ShopCard;
