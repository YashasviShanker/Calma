import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative">
      {/* Main Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Left Content */}
        <div className="flex items-center justify-center bg-cream p-8 lg:p-16">
          <div>
            <h1 className="font-serif text-display mb-6">
              Collection
              <br />
              Spring/Summer
              <br />
              2025
            </h1>
            <Link
              to="/category/suits"
              className="inline-block mt-8 px-8 py-3 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors"
            >
              EXPLORE
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative h-[60vh] lg:h-auto">
          <img
            src="/images/hero-1.jpg"
            alt="Spring Collection"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Featured Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:p-8">
        {/* Collection 1 */}
        <div className="relative h-[400px] group overflow-hidden">
          <img
            src="/images/collection-1.jpg"
            alt="Leather Collection"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="font-serif text-2xl mb-4">Iconic Leather</h3>
              <Link
                to="/category/jackets"
                className="inline-block px-6 py-2 border border-white text-sm hover:bg-white hover:text-black transition-colors"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>

        {/* Collection 2 */}
        <div className="relative h-[400px] group overflow-hidden">
          <img
            src="/images/collection-2.jpg"
            alt="Formal Collection"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="font-serif text-2xl mb-4">Formal Elegance</h3>
              <Link
                to="/category/suits"
                className="inline-block px-6 py-2 border border-white text-sm hover:bg-white hover:text-black transition-colors"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>

        {/* Collection 3 */}
        <div className="relative h-[400px] group overflow-hidden">
          <img
            src="/images/collection-3.jpg"
            alt="Accessories Collection"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="font-serif text-2xl mb-4">Timeless Accessories</h3>
              <Link
                to="/category/accessories"
                className="inline-block px-6 py-2 border border-white text-sm hover:bg-white hover:text-black transition-colors"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 