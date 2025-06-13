import React, { useState, useEffect } from 'react';
import { MapPin, Search, Plus, Store, Sparkles, ShoppingBag, Heart, Users } from 'lucide-react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ProfilePage from '../components/ProfilePage';
import AboutPage from '../components/AboutPage';
import ReviewsPage from '../components/ReviewsPage';
import ShopCard from '../components/ShopCard';
import ShopDetails from '../components/ShopDetails';
import CreateShop from '../components/CreateShop';
import EditShop from '../components/EditShop';
import SearchModal from '../components/SearchModal';
import { Shop, UserLocation } from '../types';
import { mockShops } from '../data/mockData';
import { calculateDistance } from '../utils/distance';

const Index = () => {
  const [shops, setShops] = useState<Shop[]>(mockShops);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearbyShops, setNearbyShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [showCreateShop, setShowCreateShop] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'profile' | 'about' | 'reviews'>('home');
  const [locationPermission, setLocationPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [currentUserId] = useState<string>(() => {
    // Generate or retrieve user ID from localStorage
    const existingId = localStorage.getItem('userId');
    if (existingId) return existingId;
    const newId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', newId);
    return newId;
  });

  // Get user's shops
  const userShops = shops.filter(shop => shop.createdBy === currentUserId);

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      filterNearbyShops();
    }
  }, [userLocation, shops]);

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationPermission('granted');
        },
        (error) => {
          console.error('Location access denied:', error);
          setLocationPermission('denied');
          // Use default location (e.g., city center)
          setUserLocation({
            latitude: 40.7128,
            longitude: -74.0060
          });
        }
      );
    }
  };

  const filterNearbyShops = () => {
    if (!userLocation) return;
    
    const nearby = shops.filter(shop => {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        shop.location.latitude,
        shop.location.longitude
      );
      return distance <= 2; // 2km radius
    });
    setNearbyShops(nearby);
  };

  const handleCreateShop = (newShop: Omit<Shop, 'id'>) => {
    const shop: Shop = {
      ...newShop,
      id: Date.now().toString(),
      createdBy: currentUserId // Add ownership
    };
    setShops([...shops, shop]);
    setShowCreateShop(false);
  };

  const handleUpdateShop = (updatedShop: Shop) => {
    setShops(shops.map(shop => 
      shop.id === updatedShop.id ? updatedShop : shop
    ));
    setEditingShop(null);
    setSelectedShop(updatedShop); // Show updated shop details
  };

  const handleDeleteShop = (shopId: string) => {
    if (window.confirm('Are you sure you want to delete this shop?')) {
      setShops(shops.filter(shop => shop.id !== shopId));
    }
  };

  const handleNavigate = (page: 'home' | 'profile' | 'about' | 'reviews') => {
    setCurrentPage(page);
    setSelectedShop(null);
    setEditingShop(null);
    setShowCreateShop(false);
    setShowSearch(false);
  };

  if (editingShop) {
    return (
      <div>
        <Navbar 
          currentUserId={currentUserId}
          userShopsCount={userShops.length}
          onNavigate={handleNavigate}
          onCreateShop={() => setShowCreateShop(true)}
          currentPage={currentPage}
        />
        <EditShop 
          shop={editingShop}
          onUpdateShop={handleUpdateShop}
          onCancel={() => setEditingShop(null)}
        />
      </div>
    );
  }

  if (selectedShop) {
    return (
      <div>
        <Navbar 
          currentUserId={currentUserId}
          userShopsCount={userShops.length}
          onNavigate={handleNavigate}
          onCreateShop={() => setShowCreateShop(true)}
          currentPage={currentPage}
        />
        <ShopDetails 
          shop={selectedShop} 
          onBack={() => setSelectedShop(null)} 
          onEditShop={selectedShop.createdBy === currentUserId ? setEditingShop : undefined}
          userLocation={userLocation} 
        />
      </div>
    );
  }

  if (showCreateShop) {
    return (
      <div>
        <Navbar 
          currentUserId={currentUserId}
          userShopsCount={userShops.length}
          onNavigate={handleNavigate}
          onCreateShop={() => setShowCreateShop(true)}
          currentPage={currentPage}
        />
        <CreateShop 
          onCreateShop={handleCreateShop} 
          onCancel={() => setShowCreateShop(false)}
          userLocation={userLocation}
        />
      </div>
    );
  }

  // Render different pages based on navigation
  if (currentPage === 'profile') {
    return (
      <div>
        <Navbar 
          currentUserId={currentUserId}
          userShopsCount={userShops.length}
          onNavigate={handleNavigate}
          onCreateShop={() => setShowCreateShop(true)}
          currentPage={currentPage}
        />
        <ProfilePage
          currentUserId={currentUserId}
          userShops={userShops}
          onEditShop={setEditingShop}
          onDeleteShop={handleDeleteShop}
          onViewShop={setSelectedShop}
        />
      </div>
    );
  }

  if (currentPage === 'about') {
    return (
      <div>
        <Navbar 
          currentUserId={currentUserId}
          userShopsCount={userShops.length}
          onNavigate={handleNavigate}
          onCreateShop={() => setShowCreateShop(true)}
          currentPage={currentPage}
        />
        <AboutPage />
      </div>
    );
  }

  if (currentPage === 'reviews') {
    return (
      <div>
        <Navbar 
          currentUserId={currentUserId}
          userShopsCount={userShops.length}
          onNavigate={handleNavigate}
          onCreateShop={() => setShowCreateShop(true)}
          currentPage={currentPage}
        />
        <ReviewsPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <Navbar 
        currentUserId={currentUserId}
        userShopsCount={userShops.length}
        onNavigate={handleNavigate}
        onCreateShop={() => setShowCreateShop(true)}
        currentPage={currentPage}
      />
      
      {/* Enhanced Location Status */}
      <div className="px-4 py-4 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <MapPin size={16} className="text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-gray-800">
                {locationPermission === 'granted' 
                  ? `${nearbyShops.length} shops nearby`
                  : 'Location access required'
                }
              </span>
              <p className="text-xs text-gray-500">
                {locationPermission === 'granted' 
                  ? 'Within 2km radius'
                  : 'Enable location for personalized results'
                }
              </p>
            </div>
          </div>
          {locationPermission === 'denied' && (
            <button 
              onClick={requestLocation}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Enable Location
            </button>
          )}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Enhanced Hero Section with Images */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl">
              <Sparkles size={48} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8 leading-tight">
            Discover Local
            <br />
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Treasures
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed">
            Find amazing products and services in your neighborhood with just a few clicks
          </p>
          
          {/* Enhanced Bigger Search Section */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-white/30 transform hover:scale-105 transition-all duration-500">
              <div className="mb-8">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  What are you looking for?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Discover shops and products in your area with our powerful search
                </p>
              </div>
              
              <button
                onClick={() => setShowSearch(true)}
                className="group relative inline-flex items-center w-full max-w-4xl mx-auto px-12 py-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white text-2xl font-bold rounded-3xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-3 border-4 border-white/20"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"></div>
                <Search size={40} className="mr-6 group-hover:rotate-12 transition-transform duration-500" />
                <span className="flex-1 text-left">Search Shops & Products...</span>
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
                </div>
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                    <ShoppingBag size={28} className="text-white" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold text-lg">Browse Products</span>
                    <p className="text-gray-600 text-sm">Find what you need</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                    <Store size={28} className="text-white" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold text-lg">Find Local Shops</span>
                    <p className="text-gray-600 text-sm">Discover nearby stores</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
                    <Heart size={28} className="text-white" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold text-lg">Save Favorites</span>
                    <p className="text-gray-600 text-sm">Keep track of favorites</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Images Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop" 
                alt="Local shopping" 
                className="w-full h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Local Shopping</h3>
                <p className="text-sm opacity-90">Discover unique products</p>
              </div>
            </div>
            
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop" 
                alt="Community" 
                className="w-full h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Community First</h3>
                <p className="text-sm opacity-90">Support local businesses</p>
              </div>
            </div>
            
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop" 
                alt="Easy discovery" 
                className="w-full h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Easy Discovery</h3>
                <p className="text-sm opacity-90">Find what you need quickly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Shops Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Store size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900">
                  {locationPermission === 'granted' ? 'Nearby Shops' : 'Featured Shops'}
                </h2>
                <p className="text-xl text-gray-600">
                  {locationPermission === 'granted' 
                    ? 'Discover shops in your area' 
                    : 'Explore local businesses'
                  }
                </p>
              </div>
            </div>
          </div>
          
          {(locationPermission === 'granted' ? nearbyShops : shops).length === 0 ? (
            <div className="text-center py-32">
              <div className="relative mb-12">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full"></div>
                </div>
                <Store size={80} className="relative z-10 mx-auto text-gray-400" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                {locationPermission === 'granted' ? 'No nearby shops found' : 'No shops available yet'}
              </h3>
              
              <p className="text-xl text-gray-600 mb-12 max-w-lg mx-auto">
                {locationPermission === 'granted' 
                  ? 'Be the first to create a shop in your area and help build the community!'
                  : 'Start building your local marketplace by creating the first shop!'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(locationPermission === 'granted' ? nearbyShops : shops).map((shop, index) => (
                <div 
                  key={shop.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ShopCard
                    shop={shop}
                    userLocation={userLocation}
                    onClick={() => setSelectedShop(shop)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Search Modal */}
      {showSearch && (
        <SearchModal
          shops={shops}
          onSelectShop={setSelectedShop}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  );
};

export default Index;
