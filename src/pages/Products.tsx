import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../styles/Products.css';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, []);

  const products: Product[] = [
    {
      id: 1,
      name: 'Classic White Shirt',
      price: 89.99,
      category: 'essentials',
      image: '/images/products/product-1.jpg'
    },
    {
      id: 2,
      name: 'Slim Fit Blazer',
      price: 299.99,
      category: 'formal',
      image: '/images/products/product-2.jpg'
    },
    {
      id: 3,
      name: 'Leather Belt',
      price: 49.99,
      category: 'accessories',
      image: '/images/products/product-3.jpg'
    },
    // Add more products as needed
  ];

  const categories = ['all', 'essentials', 'formal', 'accessories'];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' ? true : product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="products-page">
      <CSSTransition
        in={inProp}
        timeout={1000}
        classNames="fade"
      >
        <header className="products-header">
          <h1>Our Products</h1>
          <p>Discover our latest collection</p>
        </header>
      </CSSTransition>

      <div className="filters-section">
        <div className="categories">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="default">Default Sorting</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <TransitionGroup className="products-grid">
        {sortedProducts.map((product, index) => (
          <CSSTransition
            key={product.id}
            in={inProp}
            timeout={1000 + index * 200}
            classNames="fade-up"
          >
            <div className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <button className="add-to-cart">Add to Cart</button>
                  <button className="view-details">View Details</button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Products; 