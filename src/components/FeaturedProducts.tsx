import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

const FeaturedProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Classic Leather Jacket',
      category: 'Leather',
      price: 599.99,
      image: '/images/products/product-1.jpg'
    },
    {
      id: '2',
      name: 'Leather Weekend Bag',
      category: 'Leather',
      price: 299.99,
      image: '/images/products/product-2.jpg'
    },
    {
      id: '3',
      name: 'Italian Wool Suit',
      category: 'Formal',
      price: 899.99,
      image: '/images/products/product-3.jpg'
    },
    {
      id: '4',
      name: 'Tailored Blazer',
      category: 'Formal',
      price: 449.99,
      image: '/images/products/product-4.jpg'
    },
    {
      id: '5',
      name: 'Luxury Chronograph Watch',
      category: 'Accessories',
      price: 799.99,
      image: '/images/products/product-5.jpg'
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair text-secondary mb-4">Featured Products</h2>
          <p className="text-gray-600">Discover our curated selection of premium menswear</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group"
            >
              <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-primary mb-2">{product.category}</p>
                  <h3 className="font-playfair text-lg text-secondary mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-900 font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block border-2 border-primary text-primary px-8 py-3 hover:bg-primary hover:text-white transition-colors duration-300"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 