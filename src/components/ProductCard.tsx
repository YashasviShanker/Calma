import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const defaultImage = '/images/products/placeholder.jpg';

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage;
  };

  return (
    <Link to={`/product/${product._id}`} className="group">
      <div className="product-card">
        <div className="relative aspect-w-3 aspect-h-4 mb-4">
          <img
            src={product.images[0] || defaultImage}
            alt={product.name}
            onError={handleImageError}
            className="object-cover w-full h-full hover-scale"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-sm font-medium">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="font-playfair text-lg text-secondary">{product.name}</h3>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">{product.styleAttributes?.color || 'Various Colors'}</p>
            <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 