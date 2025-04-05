import axios from 'axios';
import { User, Product, Cart, StyleRecommendation } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const register = async (name: string, email: string, password: string): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', { name, email, password });
  return data;
};

export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', { email, password });
  return data;
};

export const getProfile = async (): Promise<User> => {
  const { data } = await api.get<User>('/auth/profile');
  return data;
};

// Products API
export const getProducts = async (category?: string, search?: string): Promise<Product[]> => {
  const { data } = await api.get<Product[]>('/products', {
    params: { category, search },
  });
  return data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

export const createProduct = async (formData: FormData): Promise<Product> => {
  const response = await axios.post(`${API_URL}/products`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProduct = async (id: string, formData: FormData): Promise<Product> => {
  const response = await axios.put(`${API_URL}/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};

export const getStyleRecommendations = async (input: string): Promise<Product[]> => {
  const { data } = await api.post<Product[]>('/products/style-recommendations', { input });
  return data;
};

// Cart API
export const getCart = async (): Promise<Cart> => {
  const { data } = await api.get<Cart>('/cart');
  return data;
};

export const addToCart = async (productId: string, quantity: number, size: string): Promise<Cart> => {
  const { data } = await api.post<Cart>('/cart', { productId, quantity, size });
  return data;
};

export const updateCartItem = async (itemId: string, quantity: number): Promise<Cart> => {
  const { data } = await api.put<Cart>(`/cart/${itemId}`, { quantity });
  return data;
};

export const removeFromCart = async (itemId: string): Promise<Cart> => {
  const { data } = await api.delete<Cart>(`/cart/${itemId}`);
  return data;
}; 