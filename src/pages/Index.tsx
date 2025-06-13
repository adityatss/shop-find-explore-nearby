import React, { useState, useEffect } from 'react';
import { MapPin, Search, Plus, Store, Sparkles } from 'lucide-react';
import Header from '../components/Header';
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
  const [locationPermission, setLocationPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [currentUserId] = useState<string>(() => {
    // Generate or retrieve user ID from localStorage
    const existingId = localStorage.getItem('userId');
    if (existingId) return existingId;
    const newId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', newId);
    return newId;
  });

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

  if (editingShop) {
    return (
      <EditShop 
        shop={editingShop}
        onUpdateShop={handleUpdateShop}
        onCancel={() => setEditingShop(null)}
      />
    );
  }

  if (selectedShop) {
    return (
      <ShopDetails 
        shop={selectedShop} 
        onBack={() => setSelectedShop(null)} 
        onEditShop={selectedShop.createdBy === currentUserId ? setEditingShop : undefined}
        userLocation={userLocation} 
      />
    );
  }

  if (showCreateShop) {
    return (
      <CreateShop 
        onCreateShop={handleCreateShop} 
        onCancel={() => setShowCreateShop(false)}
        userLocation={userLocation}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <Header onSearch={() => setShowSearch(true)} />
      
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
        {/* Enhanced Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl">
              <Sparkles size={32} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
            Discover Local
            <br />
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Treasures
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Find amazing products and services in your neighborhood with just a few clicks
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => setShowSearch(true)}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
            >
              <Search size={24} className="mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Search Shops & Products
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => setShowCreateShop(true)}
              className="group relative inline-flex items-center px-8 py-4 bg-white text-gray-800 text-lg font-semibold rounded-2xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
            >
              <Plus size={24} className="mr-3 group-hover:rotate-90 transition-transform duration-300" />
              Create Your Shop
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </button>
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
                <h2 className="text-3xl font-bold text-gray-900">
                  {locationPermission === 'granted' ? 'Nearby Shops' : 'Featured Shops'}
                </h2>
                <p className="text-gray-600">
                  {locationPermission === 'granted' 
                    ? 'Discover shops in your area' 
                    : 'Explore local businesses'
                  }
                </p>
              </div>
            </div>
          </div>
          
          {(locationPermission === 'granted' ? nearbyShops : shops).length === 0 ? (
            <div className="text-center py-20">
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full"></div>
                </div>
                <Store size={64} className="relative z-10 mx-auto text-gray-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {locationPermission === 'granted' ? 'No nearby shops found' : 'No shops available yet'}
              </h3>
              
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {locationPermission === 'granted' 
                  ? 'Be the first to create a shop in your area and help build the community!'
                  : 'Start building your local marketplace by creating the first shop!'
                }
              </p>
              
              <button
                onClick={() => setShowCreateShop(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus size={20} className="mr-2" />
                Create First Shop
              </button>
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
