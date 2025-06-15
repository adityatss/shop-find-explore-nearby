
import React from 'react';
import { Search, MapPin, Gem } from 'lucide-react';

interface HeaderProps {
  onSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-xl">
                <MapPin size={28} className="text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  ShopExplore
                </h1>
                {/* Stylish symbol */}
                <Gem size={20} className="text-purple-500 drop-shadow-glow animate-pulse" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Find • Explore • Shop</p>
            </div>
          </div>
          
          <button
            onClick={onSearch}
            className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 hover:border-purple-200 transform hover:scale-105"
          >
            <Search size={20} className="text-gray-600 group-hover:text-purple-600 transition-colors duration-300" />
            <span className="text-gray-700 group-hover:text-purple-700 font-medium hidden sm:inline transition-colors duration-300">
              Search
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
