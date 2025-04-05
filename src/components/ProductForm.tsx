import React, { useState, useEffect, FormEvent } from 'react';
import { Product } from '../types';
import { XIcon } from '@heroicons/react/outline';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (formData: FormData) => Promise<void>;
  onClose: () => void;
}

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  images: File[];
  inStock: boolean;
  sizes: string;
  tags: string;
  careInstructions: string;
  styleAttributes: {
    color: string;
    pattern: string;
    material: string;
  };
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    category: '',
    images: [],
    inStock: true,
    sizes: '',
    tags: '',
    careInstructions: '',
    styleAttributes: {
      color: '',
      pattern: '',
      material: ''
    }
  });
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const categories = [
    'jeans',
    'tshirts',
    'shirts',
    'shoes',
    'perfumes',
    'suits',
    'pants',
  ];

  const availableSizes = {
    jeans: ['30x32', '32x32', '34x32', '36x32'],
    tshirts: ['S', 'M', 'L', 'XL'],
    shirts: ['15/32', '15/34', '16/32', '16/34'],
    shoes: ['8', '9', '10', '11', '12'],
    perfumes: ['50ml', '100ml'],
    suits: ['38R', '40R', '42R', '44R'],
    pants: ['30', '32', '34', '36'],
  };

  const styleAttributeOptions = [
    'casual',
    'formal',
    'date',
    'comfy',
    'streetwear',
    'bold',
    'classic',
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...filesArray] }));
      
      // Create preview URLs for new images
      const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        images: [],
        inStock: product.inStock,
        sizes: product.sizes?.join(', ') || '',
        tags: product.tags?.join(', ') || '',
        careInstructions: product.careInstructions?.join(', ') || '',
        styleAttributes: {
          color: product.styleAttributes?.color || '',
          pattern: product.styleAttributes?.pattern || '',
          material: product.styleAttributes?.material || ''
        }
      });
      setPreviewUrls(product.images);
    }
  }, [product]);

  useEffect(() => {
    // Create preview URLs for selected images
    const newPreviewUrls = formData.images.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);

    // Cleanup function to revoke object URLs
    return () => {
      newPreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [formData.images]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('description', formData.description);
      formDataObj.append('price', formData.price);
      formDataObj.append('category', formData.category);
      formDataObj.append('inStock', String(formData.inStock));
      formDataObj.append('sizes', formData.sizes);
      formDataObj.append('tags', formData.tags);
      formDataObj.append('careInstructions', formData.careInstructions);
      formDataObj.append('styleAttributes', JSON.stringify(formData.styleAttributes));

      formData.images.forEach((image: File) => {
        formDataObj.append('images', image);
      });

      await onSubmit(formDataObj);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {product ? 'Edit Product' : 'Add Product'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sizes (comma-separated)
              </label>
              <input
                type="text"
                value={formData.sizes}
                onChange={(e) => setFormData(prev => ({ ...prev, sizes: e.target.value }))}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Style Attributes
              </label>
              <div className="space-y-4">
                <input
                  type="text"
                  value={formData.styleAttributes.color}
                  onChange={(e) => setFormData(prev => ({ ...prev, styleAttributes: { ...prev.styleAttributes, color: e.target.value } }))}
                  placeholder="Color"
                  className="input"
                />
                <input
                  type="text"
                  value={formData.styleAttributes.pattern}
                  onChange={(e) => setFormData(prev => ({ ...prev, styleAttributes: { ...prev.styleAttributes, pattern: e.target.value } }))}
                  placeholder="Pattern (optional)"
                  className="input"
                />
                <input
                  type="text"
                  value={formData.styleAttributes.material}
                  onChange={(e) => setFormData(prev => ({ ...prev, styleAttributes: { ...prev.styleAttributes, material: e.target.value } }))}
                  placeholder="Material (optional)"
                  className="input"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Care Instructions (comma-separated)
              </label>
              <input
                type="text"
                value={formData.careInstructions}
                onChange={(e) => setFormData(prev => ({ ...prev, careInstructions: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Images
              </label>
              <div className="mt-2 grid grid-cols-4 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <label className="h-24 w-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-primary-500">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                  <span className="text-3xl text-gray-400">+</span>
                </label>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="ml-2 text-sm text-gray-700">In Stock</label>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
              >
                {product ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm; 