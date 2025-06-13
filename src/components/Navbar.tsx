
import React from 'react';
import { User, Store, Home, Info, Star } from 'lucide-react';

interface NavbarProps {
  currentUserId: string;
  userShopsCount: number;
  onNavigate: (page: 'home' | 'profile' | 'about' | 'reviews') => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentUserId, userShopsCount, onNavigate, currentPage }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Store size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">ShopExplore</h1>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <item.icon size={18} />
                <span className="hidden sm:inline font-medium">{item.label}</span>
                {item.id === 'profile' && userShopsCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                    {userShopsCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
