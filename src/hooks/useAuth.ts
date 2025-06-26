
import { useState, useEffect } from 'react';
import { authService, User, LoginData, RegisterData } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = authService.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = async (credentials: LoginData) => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await authService.login(credentials);
      authService.saveUser(userData);
      setUser(userData);
      return userData;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      const newUser = await authService.register(userData);
      authService.saveUser(newUser);
      setUser(newUser);
      return newUser;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  const getCurrentUserId = (): string => {
    if (user) return user._id;
    
    // Fallback to old system for backward compatibility
    const existingId = localStorage.getItem('userId');
    if (existingId && !existingId.startsWith('user_')) {
      return existingId;
    }
    
    // Generate temporary ID for anonymous users
    const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', tempId);
    return tempId;
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    getCurrentUserId,
    isLoggedIn: !!user,
  };
};
