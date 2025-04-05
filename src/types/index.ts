export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
  sizes: string[];
  styleAttributes: {
    color: string;
    pattern?: string;
    material?: string;
  };
  tags: string[];
  careInstructions?: string[];
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  size: string;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  total: number;
}

export interface StyleRecommendation {
  _id: string;
  products: Product[];
  description: string;
  occasion: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (productId: string, quantity: number, size: string) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
} 