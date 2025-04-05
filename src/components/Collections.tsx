import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Collections.css';

const collections = [
  {
    name: 'Summer Collection',
    description: 'Light and breezy pieces perfect for summer days',
    image: '/images/collections/summer-collection.jpg',
    link: '/category/summer'
  },
  {
    name: 'Winter Collection',
    description: 'Cozy and warm essentials for the cold season',
    image: '/images/collections/winter-collection.jpg',
    link: '/category/winter'
  },
  {
    name: 'Casual Collection',
    description: 'Everyday comfort meets style',
    image: '/images/collections/casual-collection.jpg',
    link: '/category/casual'
  },
  {
    name: 'Sports Collection',
    description: 'Performance wear for active lifestyles',
    image: '/images/collections/sports-collection.jpg',
    link: '/category/sports'
  },
  {
    name: 'Evening Collection',
    description: 'Elegant attire for special occasions',
    image: '/images/collections/evening-collection.jpg',
    link: '/category/evening'
  },
  {
    name: 'Formal Collection',
    description: 'Professional attire for the modern workplace',
    image: '/images/collections/formal-collection.jpg',
    link: '/category/formal'
  },
  {
    name: 'Leather Collection',
    description: 'Premium leather accessories and footwear',
    image: '/images/collections/leather-collection.jpg',
    link: '/category/leather'
  },
  {
    name: 'Accessories Collection',
    description: 'Complete your look with our curated accessories',
    image: '/images/collections/accessories-collection.jpg',
    link: '/category/accessories'
  }
];

const Collections: React.FC = () => {
  return (
    <section className="collections-section py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <Link
              to={collection.link}
              key={index}
              className="collection-card group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">{collection.name}</h3>
                  <p className="text-sm opacity-90">{collection.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections; 