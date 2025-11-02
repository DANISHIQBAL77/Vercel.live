'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// ============================================
// PRODUCT CARD COMPONENT
// ============================================
export default function ProductCard({ product, big, onAddToCart }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${product.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative bg-black border border-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg hover:border-blue-600 transition-all duration-300 ease-in-out flex flex-col items-center w-full group cursor-pointer ${big ? "h-[350px] sm:h-[420px]" : "h-[350px] sm:h-[195px]"}`}
    >
      <div className="flex items-center justify-center flex-1 w-full">
        <Image
          src={product.image}
          alt={product.name}
          width={512}
          height={512}
          className={`object-contain rounded-md transition-transform duration-300 ease-in-out group-hover:-translate-y-2 group-hover:scale-105 ${big ? "h-72 sm:h-96 w-full max-w-2xl" : "h-72 sm:h-32 w-full sm:w-40"}`}
          priority={true}
        />
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 sm:gap-3 px-3 py-2 bg-black border border-gray-800 rounded-full backdrop-blur-md">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white whitespace-nowrap">
          {product.name}
        </h2>
        <p className="text-white text-xs sm:text-sm bg-blue-600 px-3 sm:px-4 py-1 rounded-full font-medium whitespace-nowrap">
          ${product.price}.00 USD
        </p>
      </div>
    </div>
  );
}

// ============================================
// MOVING CARDS CAROUSEL SECTION
// ============================================
export function MovingCardsSection({ products, speed = 1 }) {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = speed;

    const animate = () => {
      if (isAutoScrolling) {
        scrollPosition += scrollSpeed;
        const maxScroll = scrollContainer.scrollWidth / 3;
        if (scrollPosition >= maxScroll) scrollPosition = 0;
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      if (Math.abs(scrollContainer.scrollLeft - scrollPosition) > 2) {
        setIsAutoScrolling(false);
        scrollPosition = scrollContainer.scrollLeft;

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => setIsAutoScrolling(true), 3000);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isAutoScrolling, speed, isMounted]);

  const handleCardClick = (product) => router.push(`/product/${product.slug}`);

  if (!isMounted) {
    return (
      <div className="w-full py-4 mt-2">
        <div className="flex overflow-x-auto pb-4">
          <div className="flex">
            {products.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex-shrink-0 w-[280px] h-[280px] sm:w-[512px] sm:h-48 bg-black border border-gray-800 rounded-lg p-4 shadow-md mx-3"
              >
                <div className="flex items-center justify-center h-[200px] sm:h-44 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={512}
                    height={512}
                    className="object-contain h-full w-full rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <div className="w-full py-4 mt-2">
      <div 
        ref={scrollRef} 
        className="flex overflow-x-auto pb-4 carousel-container"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#6b7280 #1f2937' }}
      >
        {duplicatedProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            onClick={() => handleCardClick(product)}
            className="flex-shrink-0 w-[280px] h-[280px] sm:w-[512px] sm:h-48 bg-black border border-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg hover:border-blue-600 transition-all duration-300 mx-3 group relative overflow-visible cursor-pointer"
          >
            <div className="flex items-center justify-center h-[200px] sm:h-44 mb-4 relative z-0">
              <Image
                src={product.image}
                alt={product.name}
                width={512}
                height={512}
                className="object-contain h-full w-full rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-black border border-gray-800 rounded-full backdrop-blur-md w-fit z-10">
              <h2 className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                {product.name}
              </h2>
              <p className="text-white text-xs bg-blue-600 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                ${product.price}.00
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
