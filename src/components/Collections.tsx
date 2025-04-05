import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Collections.css';

// Import collection images
import summerCollection from '../assets/collections/summer-collection.jpg';
import winterCollection from '../assets/collections/winter-collection.jpg';
import casualCollection from '../assets/collections/casual-collection.jpg';
import sportsCollection from '../assets/collections/sports-collection.jpg';
import eveningCollection from '../assets/collections/evening-collection.jpg';
import formalCollection from '../assets/collections/formal-collection.jpg';
import leatherCollection from '../assets/collections/leather-collection.jpg';
import accessoriesCollection from '../assets/collections/accessories-collection.jpg';

const collections = [
  {
    name: 'Summer Collection',
    description: 'Light and breezy pieces perfect for summer days',
    image: process.env.PUBLIC_URL + '/images/collections/summer-collection.jpg',
    link: '/category/summer'
  },
  {
    name: 'Winter Collection',
    description: 'Cozy and warm essentials for the cold season',
    image: process.env.PUBLIC_URL + '/images/collections/winter-collection.jpg',
    link: '/category/winter'
  },
  {
    name: 'Casual Collection',
    description: 'Everyday comfort meets style',
    image: process.env.PUBLIC_URL + '/images/collections/casual-collection.jpg',
    link: '/category/casual'
  },
  {
    name: 'Sports Collection',
    description: 'Performance wear for active lifestyles',
    image: process.env.PUBLIC_URL + '/images/collections/sports-collection.jpg',
    link: '/category/sports'
  },
  {
    name: 'Evening Collection',
    description: 'Elegant attire for special occasions',
    image: process.env.PUBLIC_URL + '/images/collections/evening-collection.jpg',
    link: '/category/evening'
  },
  {
    name: 'Formal Collection',
    description: 'Professional attire for the modern workplace',
    image: process.env.PUBLIC_URL + '/images/collections/formal-collection.jpg',
    link: '/category/formal'
  },
  {
    name: 'Leather Collection',
    description: 'Premium leather accessories and footwear',
    image: process.env.PUBLIC_URL + '/images/collections/leather-collection.jpg',
    link: '/category/leather'
  },
  {
    name: 'Accessories Collection',
    description: 'Complete your look with our curated accessories',
    image: process.env.PUBLIC_URL + '/images/collections/accessories-collection.jpg',
    link: '/category/accessories'
  }
];

const Collections: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const handleImageError = (collectionName: string) => {
    console.error(`Failed to load image for collection: ${collectionName}`);
    setImageErrors(prev => ({
      ...prev,
      [collectionName]: true
    }));
  };

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
                  onError={() => handleImageError(collection.name)}
                />
                {imageErrors[collection.name] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
                    Image not available
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">{collection.name}</h3>
                  <p className="text-sm opacity-90">{collection.description}</p>
                  <p className="text-xs mt-2 opacity-75">Image path: {collection.image}</p>
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