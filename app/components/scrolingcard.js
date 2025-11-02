'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

// Infinite Scroll Card Component
function ScrollingCard({ product }) {
  return (
    <div className="flex-shrink-0 w-64 bg-black border border-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg hover:border-blue-600 transition-all duration-300 ease-in-out mx-3">
      <div className="flex items-center justify-center h-40 mb-4 relative w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain rounded-md"
          priority={true}
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-white font-semibold text-sm">{product.name}</h3>
        <p className="text-white bg-blue-600 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
          ${product.price}.00
        </p>
      </div>
    </div>
  );
}

// Infinite Scroll Section Component
export default function InfiniteScrollSection() {
  const scrollRef = useRef(null);

  const products = [
    { id: 1, name: "Black Hoodie", price: 49, image: "/images/t-shirt-1.jpg" },
    { id: 2, name: "White T-shirt", price: 25, image: "/images/bag-1-dark.jpg" },
    { id: 3, name: "Sneakers", price: 89, image: "/images/cup-black.avif" },
    { id: 4, name: "Cap", price: 19, image: "/images/hoodie-1.avif" },
    { id: 5, name: "Backpack", price: 59, image: "/images/t-shirt-1.jpg" },
    { id: 6, name: "Sunglasses", price: 39, image: "/images/bag-1-dark.jpg" },
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 1;

    const animate = () => {
      scrollPosition += scrollSpeed;

      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  const duplicatedProducts = [...products, ...products];

  return (
    <div className="w-full bg-black py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Trending Products</h2>
        <p className="text-gray-400">Discover our most popular items</p>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="flex">
          {duplicatedProducts.map((product, index) => (
            <ScrollingCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
