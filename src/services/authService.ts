
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

class AuthService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async register(userData: RegisterData): Promise<User> {
    const response = await this.api.post<{ user: User }>('/auth/register', userData);
    return response.data.user;
  }

  async login(credentials: LoginData): Promise<User> {
    const response = await this.api.post<{ user: User }>('/auth/login', credentials);
    return response.data.user;
  }

  // Local storage helpers
  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', user._id);
  }

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}

export const authService = new AuthService();
