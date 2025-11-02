'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Image from 'next/image'; // ✅ Added import

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Product image */}
        <div className="w-full h-64 relative rounded-xl mb-4 border border-gray-700 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Product details */}
        <h2 className="text-2xl font-semibold text-white mb-1">{product.name}</h2>
        <p className="text-gray-400 text-sm mb-4">{product.description}</p>
        <p className="text-blue-400 font-semibold text-lg mb-5">${product.price}</p>

        {/* Color selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-white mb-2">
              Color: <span className="text-gray-400 font-normal">{selectedColor?.name}</span>
            </h3>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`px-5 py-2 rounded-full border-2 font-medium text-sm transition-all ${
                    selectedColor?.name === color.name
                      ? 'border-blue-500 bg-blue-600 text-white scale-105'
                      : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                  }`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-white mb-2">
              Size: <span className="text-gray-400 font-normal">{selectedSize}</span>
            </h3>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full border-2 font-medium text-sm transition-all ${
                    selectedSize === size
                      ? 'border-blue-500 bg-blue-600 text-white scale-105'
                      : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to cart button */}
        <button
          onClick={() => {
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              color: selectedColor?.name,
              size: selectedSize,
            });
            onClose();
          }}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full transition-all font-semibold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
