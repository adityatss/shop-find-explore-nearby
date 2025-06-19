
import { useState, useEffect, useCallback } from 'react';
import { Shop, UserLocation } from '../types';
import { apiService } from '../services/api';
import { apiShopToShop, shopToApiShop } from '../utils/shopConverter';
import { mockShops } from '../data/mockData';

export const useShopsApi = (currentUserId: string) => {
  const [shops, setShops] = useState<Shop[]>(mockShops);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useApi, setUseApi] = useState(false);

  // Test API connection
  const testApiConnection = useCallback(async () => {
    try {
      setIsLoading(true);
      await apiService.getAllShops();
      setUseApi(true);
      console.log('API connection successful - using backend');
    } catch (err) {
      console.log('API not available - using mock data');
      setUseApi(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load shops from API or use mock data
  const loadShops = useCallback(async () => {
    if (!useApi) {
      setShops(mockShops);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const apiShops = await apiService.getAllShops();
      const convertedShops = apiShops.map(apiShopToShop);
      setShops(convertedShops);
    } catch (err) {
      setError('Failed to load shops');
      console.error('Error loading shops:', err);
      // Fallback to mock data
      setShops(mockShops);
    } finally {
      setIsLoading(false);
    }
  }, [useApi]);

  // Load nearby shops
  const loadNearbyShops = useCallback(async (userLocation: UserLocation) => {
    if (!useApi) {
      return mockShops.filter(shop => {
        const distance = Math.sqrt(
          Math.pow(shop.location.latitude - userLocation.latitude, 2) +
          Math.pow(shop.location.longitude - userLocation.longitude, 2)
        );
        return distance <= 0.02; // Approximate 2km in degrees
      });
    }

    try {
      setIsLoading(true);
      setError(null);
      const apiShops = await apiService.getNearbyShops(
        userLocation.latitude,
        userLocation.longitude,
        2
      );
      return apiShops.map(apiShopToShop);
    } catch (err) {
      setError('Failed to load nearby shops');
      console.error('Error loading nearby shops:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [useApi]);

  // Create shop
  const createShop = useCallback(async (newShop: Omit<Shop, 'id'>) => {
    if (!useApi) {
      const shop: Shop = {
        ...newShop,
        id: Date.now().toString(),
        createdBy: currentUserId,
      };
      setShops(prev => [...prev, shop]);
      return shop;
    }

    try {
      setIsLoading(true);
      setError(null);
      const apiShopData = shopToApiShop({ ...newShop, id: '' }, currentUserId);
      const createdApiShop = await apiService.createShop(apiShopData);
      const createdShop = apiShopToShop(createdApiShop);
      setShops(prev => [...prev, createdShop]);
      return createdShop;
    } catch (err) {
      setError('Failed to create shop');
      console.error('Error creating shop:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [useApi, currentUserId]);

  // Update shop
  const updateShop = useCallback(async (updatedShop: Shop) => {
    if (!useApi) {
      setShops(prev => prev.map(shop => 
        shop.id === updatedShop.id ? updatedShop : shop
      ));
      return updatedShop;
    }

    try {
      setIsLoading(true);
      setError(null);
      const apiShopData = shopToApiShop(updatedShop, currentUserId);
      const updatedApiShop = await apiService.updateShop(updatedShop.id, apiShopData);
      const convertedShop = apiShopToShop(updatedApiShop);
      setShops(prev => prev.map(shop => 
        shop.id === convertedShop.id ? convertedShop : shop
      ));
      return convertedShop;
    } catch (err) {
      setError('Failed to update shop');
      console.error('Error updating shop:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [useApi, currentUserId]);

  // Delete shop
  const deleteShop = useCallback(async (shopId: string) => {
    if (!useApi) {
      setShops(prev => prev.filter(shop => shop.id !== shopId));
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await apiService.deleteShop(shopId);
      setShops(prev => prev.filter(shop => shop.id !== shopId));
    } catch (err) {
      setError('Failed to delete shop');
      console.error('Error deleting shop:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [useApi]);

  useEffect(() => {
    testApiConnection();
  }, [testApiConnection]);

  useEffect(() => {
    if (useApi) {
      loadShops();
    }
  }, [useApi, loadShops]);

  return {
    shops,
    isLoading,
    error,
    useApi,
    loadNearbyShops,
    createShop,
    updateShop,
    deleteShop,
    testApiConnection,
  };
};
