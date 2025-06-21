
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 seconds timeout
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`Response received from: ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('API Response error:', error.response?.data || error.message);
        if (error.response?.status === 404) {
          throw new Error('Resource not found');
        } else if (error.response?.status >= 500) {
          throw new Error('Server error occurred');
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout');
        }
        throw error;
      }
    );
  }

  async getNearbyShops(latitude: number, longitude: number, radiusKm: number = 2): Promise<ApiShop[]> {
    const response = await this.api.get<ApiShop[]>(`/shops/nearby`, {
      params: {
        lat: latitude,
        lng: longitude,
        radius: radiusKm
      }
    });
    return response.data;
  }

  async getAllShops(): Promise<ApiShop[]> {
    const response = await this.api.get<ApiShop[]>('/shops');
    return response.data;
  }

  async getShopById(id: string): Promise<ApiShop> {
    const response = await this.api.get<ApiShop>(`/shops/${id}`);
    return response.data;
  }

  async createShop(shop: Omit<ApiShop, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiShop> {
    const response = await this.api.post<ApiShop>('/shops', shop);
    return response.data;
  }

  async updateShop(id: string, shop: Partial<ApiShop>): Promise<ApiShop> {
    const response = await this.api.put<ApiShop>(`/shops/${id}`, shop);
    return response.data;
  }

  async deleteShop(id: string): Promise<void> {
    await this.api.delete(`/shops/${id}`);
  }

  async searchShops(query: string): Promise<ApiShop[]> {
    const response = await this.api.get<ApiShop[]>('/shops/search', {
      params: { q: query }
    });
    return response.data;
  }
}

export const apiService = new ApiService();
