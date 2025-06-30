
import React, { useState } from 'react';
import { User, Store, Home, Info, Star, Plus, ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';

interface NavbarProps {
  currentUserId: string;
  userShopsCount: number;
  onNavigate: (page: 'home' | 'profile' | 'about' | 'reviews') => void;
  onCreateShop: () => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentUserId, userShopsCount, onNavigate, onCreateShop, currentPage }) => {
  const { user, logout, isLoggedIn } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleCreateShop = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    onCreateShop();
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    onNavigate('profile');
  };

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Store size={24} className="text-white" />
              </div>
              <ShoppingCart size={22} className="text-blue-500 ml-1 drop-shadow-glow" />
              <h1 className="text-xl font-bold text-gray-900 ml-2">BrowseCart</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* User Info */}
              {isLoggedIn && user && (
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">
                    {user.name}
                  </span>
                </div>
              )}

              {/* Create Shop Button */}
              <button
                onClick={handleCreateShop}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus size={18} />
                <span className="hidden sm:inline font-medium">Create Shop</span>
              </button>
              
              {/* Navigation Items */}
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => item.id === 'profile' ? handleProfileClick() : onNavigate(item.id as any)}
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
                
                {/* Login/Logout Button */}
                {isLoggedIn ? (
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <LogOut size={18} />
                    <span className="hidden sm:inline font-medium">Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                  >
                    <User size={18} />
                    <span className="hidden sm:inline font-medium">Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => window.location.reload()}
      />
    </>
  );
};

export default Navbar;
