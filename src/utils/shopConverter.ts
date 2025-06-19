
import { Shop, Item } from '../types';
import { ApiShop } from '../services/api';

export function apiShopToShop(apiShop: ApiShop): Shop {
  return {
    id: apiShop._id || '',
    name: apiShop.name,
    description: apiShop.description,
    address: apiShop.address,
    location: {
      latitude: apiShop.location.coordinates[1],
      longitude: apiShop.location.coordinates[0],
    },
    posterUrl: apiShop.posterUrl,
    items: apiShop.items.map(item => ({
      id: item._id || `item_${Date.now()}_${Math.random()}`,
      name: item.name,
      quantity: item.quantity,
    })),
    owner: apiShop.owner,
    phone: apiShop.phone,
    email: apiShop.email,
    openingHours: apiShop.openingHours,
    category: apiShop.category,
    createdBy: apiShop.createdBy,
    isOpen: apiShop.isOpen,
  };
}

export function shopToApiShop(shop: Shop, createdBy: string): Omit<ApiShop, '_id' | 'createdAt' | 'updatedAt'> {
  return {
    name: shop.name,
    description: shop.description,
    address: shop.address,
    location: {
      type: 'Point',
      coordinates: [shop.location.longitude, shop.location.latitude],
    },
    posterUrl: shop.posterUrl,
    items: shop.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
    })),
    owner: shop.owner,
    phone: shop.phone,
    email: shop.email,
    openingHours: shop.openingHours,
    category: shop.category,
    createdBy,
    isOpen: shop.isOpen,
  };
}
