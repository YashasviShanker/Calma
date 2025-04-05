import React from 'react';
import { Link } from 'react-router-dom';

const Collections: React.FC = () => {
  const collections = [
    {
      id: 'leather',
      title: 'Iconic Leather',
      image: '/images/collections/leather-collection.jpg',
      link: '/collections/leather'
    },
    {
      id: 'formal',
      title: 'Formal Elegance',
      image: '/images/collections/formal-collection.jpg',
      link: '/collections/formal'
    },
    {
      id: 'accessories',
      title: 'Timeless Accessories',
      image: '/images/collections/accessories-collection.jpg',
      link: '/collections/accessories'
    }
  ];

  return (
    <section className="container-custom py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            to={collection.link}
            className="group relative overflow-hidden"
          >
            <div className="aspect-[4/5] relative">
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30 flex flex-col items-center justify-center">
                <h3 className="text-white text-2xl md:text-3xl font-playfair mb-4">
                  {collection.title}
                </h3>
                <span className="inline-block border border-white text-white px-6 py-2 hover:bg-white hover:text-black transition-colors duration-300">
                  SHOP NOW
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Collections; 