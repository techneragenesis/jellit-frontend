'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { User, loginUser as apiLoginUser, registerUser as apiRegisterUser } from './api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string, phone: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  skipAuth: () => void;
  hasSkippedAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSkippedAuth, setHasSkippedAuth] = useState(false);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedSkip = localStorage.getItem('skipAuth');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        // Clear corrupted data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    if (storedSkip === 'true') {
      setHasSkippedAuth(true);
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLoginUser({ email, password });
      
      if (response.error) {
        return { success: false, error: response.error };
      }

      if (response.data) {
        // Backend returns user directly, use user.id as token for now
        const userData = response.data;
        const userToken = userData.id; // Using user ID as token
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('token', userToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.removeItem('skipAuth');
        setHasSkippedAuth(false);
        return { success: true };
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Something went wrong. Please try again.' };
    }
  };

  const register = async (email: string, password: string, name: string, phone: string) => {
    try {
      const response = await apiRegisterUser({ email, password, name, phone });
      
      if (response.error) {
        return { success: false, error: response.error };
      }

      if (response.data) {
        // Backend returns user directly, use user.id as token for now
        const userData = response.data;
        const userToken = userData.id; // Using user ID as token
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('token', userToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.removeItem('skipAuth');
        setHasSkippedAuth(false);
        return { success: true };
      }

      return { success: false, error: 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Something went wrong. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setHasSkippedAuth(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('skipAuth');
  };

  const skipAuth = () => {
    setHasSkippedAuth(true);
    localStorage.setItem('skipAuth', 'true');
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    skipAuth,
    hasSkippedAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
