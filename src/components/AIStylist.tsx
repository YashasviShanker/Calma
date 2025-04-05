import React, { useState } from 'react';
import { XIcon, ChatAlt2Icon } from '@heroicons/react/outline';
import { Product } from '../types';
import * as api from '../services/api';
import ProductCard from './ProductCard';

const AIStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const products = await api.getStyleRecommendations(input);
      setRecommendations(products);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-primary-600 text-white rounded-full p-3 shadow-lg hover:bg-primary-700 transition-colors duration-200"
      >
        <ChatAlt2Icon className="h-6 w-6" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium">AI Stylist</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Chat content */}
          <div className="p-4 h-96 flex flex-col">
            {/* Welcome message */}
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700">
                Hi! I'm your AI stylist. Tell me what you're looking for or how you're feeling, and I'll recommend some outfits for you.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Try: "I need something for a date" or "I want comfy streetwear"
              </p>
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="space-y-4 overflow-y-auto flex-1 mb-4">
                <p className="text-sm text-gray-600">Here are some recommendations:</p>
                <div className="grid grid-cols-2 gap-4">
                  {recommendations.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="text-red-500 text-sm mb-4">{error}</div>
            )}

            {/* Input form */}
            <form onSubmit={handleSubmit} className="mt-auto">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tell me what you're looking for..."
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50"
                  disabled={loading || !input.trim()}
                >
                  {loading ? 'Thinking...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIStylist; 