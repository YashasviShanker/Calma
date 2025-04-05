import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setState(prev => ({
        ...prev,
        user: JSON.parse(user),
        loading: false,
      }));
    } else {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const user = await api.login(email, password);
      localStorage.setItem('user', JSON.stringify(user));
      setState(prev => ({ ...prev, user, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const user = await api.register(name, email, password);
      localStorage.setItem('user', JSON.stringify(user));
      setState(prev => ({ ...prev, user, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setState(prev => ({ ...prev, user: null }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 