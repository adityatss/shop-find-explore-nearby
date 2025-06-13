
import React from 'react';
import { Search, MapPin } from 'lucide-react';

interface HeaderProps {
  onSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <MapPin size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ShopExplore</h1>
              <p className="text-sm text-gray-500">Find • Explore • Shop</p>
            </div>
          </div>
          
          <button
            onClick={onSearch}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Search size={18} className="text-gray-600" />
            <span className="text-gray-600 hidden sm:inline">Search</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
