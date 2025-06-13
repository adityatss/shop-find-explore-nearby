
import React, { useState, useEffect } from 'react';
import { MapPin, Search, Plus, Store } from 'lucide-react';
import Header from '../components/Header';
import ShopCard from '../components/ShopCard';
import ShopDetails from '../components/ShopDetails';
import CreateShop from '../components/CreateShop';
import SearchModal from '../components/SearchModal';
import { Shop, UserLocation } from '../types';
import { mockShops } from '../data/mockData';
import { calculateDistance } from '../utils/distance';

const Index = () => {
  const [shops, setShops] = useState<Shop[]>(mockShops);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearbyShops, setNearbyShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [showCreateShop, setShowCreateShop] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'pending' | 'granted' | 'denied'>('pending');

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
      id: Date.now().toString()
    };
    setShops([...shops, shop]);
    setShowCreateShop(false);
  };

  if (selectedShop) {
    return <ShopDetails shop={selectedShop} onBack={() => setSelectedShop(null)} />;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header onSearch={() => setShowSearch(true)} />
      
      {/* Location Status */}
      <div className="px-4 py-3 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-blue-600" />
            <span className="text-sm text-gray-600">
              {locationPermission === 'granted' 
                ? `Showing shops within 2km • ${nearbyShops.length} found`
                : 'Location access required for nearby shops'
              }
            </span>
          </div>
          {locationPermission === 'denied' && (
            <button 
              onClick={requestLocation}
              className="text-blue-600 text-sm hover:underline"
            >
              Enable Location
            </button>
          )}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Local Shops
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find products and services in your neighborhood
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowSearch(true)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search size={20} className="mr-2" />
              Search Shops & Products
            </button>
            <button
              onClick={() => setShowCreateShop(true)}
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Create Your Shop
            </button>
          </div>
        </div>

        {/* Shops Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Store size={24} className="mr-2 text-blue-600" />
              {locationPermission === 'granted' ? 'Nearby Shops' : 'All Shops'}
            </h2>
          </div>
          
          {(locationPermission === 'granted' ? nearbyShops : shops).length === 0 ? (
            <div className="text-center py-12">
              <Store size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {locationPermission === 'granted' ? 'No nearby shops found' : 'No shops available'}
              </h3>
              <p className="text-gray-500 mb-4">
                {locationPermission === 'granted' 
                  ? 'Try expanding your search radius or create the first shop in your area!'
                  : 'Be the first to create a shop in your area!'
                }
              </p>
              <button
                onClick={() => setShowCreateShop(true)}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus size={16} className="mr-2" />
                Create Shop
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(locationPermission === 'granted' ? nearbyShops : shops).map(shop => (
                <ShopCard
                  key={shop.id}
                  shop={shop}
                  userLocation={userLocation}
                  onClick={() => setSelectedShop(shop)}
                />
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
