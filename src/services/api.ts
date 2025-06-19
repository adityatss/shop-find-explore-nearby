
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export interface ApiShop {
  _id?: string;
  name: string;
  description: string;
  address: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  posterUrl?: string;
  items: Array<{
    _id?: string;
    name: string;
    quantity: number;
  }>;
  owner: string;
  phone: string;
  email: string;
  openingHours: string;
  category: string;
  createdBy: string;
  isOpen?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async getNearbyShops(latitude: number, longitude: number, radiusKm: number = 2): Promise<ApiShop[]> {
    return this.request<ApiShop[]>(`/shops/nearby?lat=${latitude}&lng=${longitude}&radius=${radiusKm}`);
  }

  async getAllShops(): Promise<ApiShop[]> {
    return this.request<ApiShop[]>('/shops');
  }

  async getShopById(id: string): Promise<ApiShop> {
    return this.request<ApiShop>(`/shops/${id}`);
  }

  async createShop(shop: Omit<ApiShop, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiShop> {
    return this.request<ApiShop>('/shops', {
      method: 'POST',
      body: JSON.stringify(shop),
    });
  }

  async updateShop(id: string, shop: Partial<ApiShop>): Promise<ApiShop> {
    return this.request<ApiShop>(`/shops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(shop),
    });
  }

  async deleteShop(id: string): Promise<void> {
    return this.request<void>(`/shops/${id}`, {
      method: 'DELETE',
    });
  }

  async searchShops(query: string): Promise<ApiShop[]> {
    return this.request<ApiShop[]>(`/shops/search?q=${encodeURIComponent(query)}`);
  }
}

export const apiService = new ApiService();
