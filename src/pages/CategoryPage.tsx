import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">{categoryTitle}</h1>
      <ProductGrid category={category || ''} />
    </div>
  );
};

export default CategoryPage; 