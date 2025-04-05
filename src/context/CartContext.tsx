import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  size: string;
}

interface Cart {
  items: CartItem[];
  total: number;
}

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

interface CartContextType extends CartState {
  addToCart: (productId: string, quantity: number, size: string) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CartState>({
    cart: null,
    loading: false,
    error: null
  });

  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          setState(prev => ({ ...prev, loading: true }));
          const cart = await api.getCart();
          setState(prev => ({ ...prev, cart, loading: false }));
        } catch (error) {
          setState(prev => ({
            ...prev,
            error: error instanceof Error ? error.message : 'An error occurred',
            loading: false,
          }));
        }
      } else {
        setState(prev => ({ ...prev, cart: null }));
      }
    };

    fetchCart();
  }, [user]);

  const addToCart = async (productId: string, quantity: number, size: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const cart = await api.addToCart(productId, quantity, size);
      setState(prev => ({ ...prev, cart, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const cart = await api.updateCartItem(itemId, quantity);
      setState(prev => ({ ...prev, cart, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const cart = await api.removeFromCart(itemId);
      setState(prev => ({ ...prev, cart, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  };

  const clearCart = () => {
    setState(prev => ({ ...prev, cart: null }));
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, updateCartItem, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 