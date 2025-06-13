
import React from 'react';
import { MapPin, Users, Star, Clock, DollarSign, Phone, Wifi } from 'lucide-react';
import { Hostel, UserLocation } from '../types';
import { calculateDistance } from '../utils/distance';

interface HostelCardProps {
  hostel: Hostel;
  userLocation: UserLocation | null;
  onClick: () => void;
}

const HostelCard: React.FC<HostelCardProps> = ({ hostel, userLocation, onClick }) => {
  const distance = userLocation 
    ? calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        hostel.location.latitude,
        hostel.location.longitude
      )
    : null;

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-white/30 hover:border-blue-200 transform hover:scale-105"
    >
      {/* Image section */}
      <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 relative overflow-hidden">
        {hostel.posterUrl ? (
          <img 
            src={hostel.posterUrl} 
            alt={hostel.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Users size={48} className="text-blue-600" />
          </div>
        )}
        
        {/* Distance badge */}
        {distance !== null && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
            {distance.toFixed(1)} km
          </div>
        )}
        
        {/* Rating badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold flex items-center">
          <Star size={10} className="mr-1 fill-white" />
          {hostel.rating}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
            {hostel.name}
          </h3>
          <div className="flex items-center text-green-600 font-bold">
            <DollarSign size={16} />
            <span className="text-lg">{hostel.pricePerNight}</span>
            <span className="text-sm text-gray-500">/night</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={14} className="mr-2 text-blue-500" />
          <span className="text-sm truncate">
            {distance !== null ? `${distance.toFixed(1)} km away` : hostel.address}
          </span>
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <Phone size={14} className="mr-2 text-green-500" />
          <span className="text-sm">{hostel.phone}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <Clock size={14} className="mr-2 text-orange-500" />
          <span className="text-sm">Check-in: {hostel.checkInTime}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {hostel.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">
              {hostel.availableRooms} rooms available
            </span>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium group-hover:shadow-lg transform group-hover:scale-105 transition-all duration-300">
            Book Now
          </div>
        </div>
        
        {/* Amenities preview */}
        <div className="mt-3 flex flex-wrap gap-1">
          {hostel.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {amenity}
            </span>
          ))}
          {hostel.amenities.length > 3 && (
            <span className="text-xs text-gray-500">+{hostel.amenities.length - 3} more</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostelCard;
