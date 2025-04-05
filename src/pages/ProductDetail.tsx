import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

interface Size {
  name: string;
  inStock: boolean;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const defaultImage = '/images/products/placeholder.jpg';

  // This would typically come from an API
  const product = {
    id,
    name: 'Classic Leather Jacket',
    price: 599.99,
    description: 'Crafted from premium Italian leather, this timeless jacket features a tailored fit and luxurious details. Perfect for both casual and semi-formal occasions.',
    category: 'Leather',
    images: [
      `/images/products/product-${id}.jpg`,
      `/images/products/product-${id}-alt.jpg`,
      `/images/products/product-${id}-detail.jpg`
    ],
    sizes: [
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: false }
    ],
    details: [
      'Premium Italian leather',
      'YKK zipper hardware',
      'Interior pocket system',
      'Quilted lining for comfort',
      'Handcrafted in Italy'
    ],
    care: [
      'Professional leather clean only',
      'Store in a cool, dry place',
      'Use leather conditioner every 6 months',
      'Avoid direct sunlight'
    ]
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // Add to cart logic here
    alert('Added to cart!');
  };

  // Function to check if an image exists
  const checkImage = (url: string) => {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  // Filter out non-existent images
  const [validImages, setValidImages] = useState<string[]>([]);
  
  React.useEffect(() => {
    const validateImages = async () => {
      const validatedImages = await Promise.all(
        product.images.map(async (image) => ({
          url: image,
          exists: await checkImage(image)
        }))
      );
      setValidImages(validatedImages.filter(img => img.exists).map(img => img.url));
    };
    validateImages();
  }, [product.images]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {product.images.map((image, index) => (
              <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <p className="text-primary mb-2">{product.category}</p>
              <h1 className="font-playfair text-4xl text-secondary mb-4">{product.name}</h1>
              <p className="text-2xl font-medium">${product.price.toFixed(2)}</p>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-4">Select Size</h3>
              <div className="flex gap-4">
                {product.sizes.map((size: Size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    disabled={!size.inStock}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-medium transition-all
                      ${selectedSize === size.name 
                        ? 'border-primary text-primary' 
                        : size.inStock 
                          ? 'border-gray-200 text-gray-600 hover:border-gray-300' 
                          : 'border-gray-100 text-gray-300 cursor-not-allowed'
                      }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
            >
              Add to Cart
            </button>

            {/* Product Details */}
            <div className="space-y-6 pt-8 border-t">
              <div>
                <h3 className="font-playfair text-lg mb-4">Product Details</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-playfair text-lg mb-4">Care Instructions</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {product.care.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 