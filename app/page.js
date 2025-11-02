'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import ProductCard, { MovingCardsSection } from './components/productcard';
import Footer from "./components/footer";
import { useCart } from './context/CartContext';

// Featured products with color variations
const featuredProducts = [
  { 
    id: 1,
    slug: "black-hoodie",
    name: "Acme Circles T-Shirt", 
    price: 49, 
    image: "/images/t-shirt-1.jpg",
    colors: [
      { name: "Black", hex: "#000000", image: "/images/t-shirt-1.jpg" },
      { name: "Navy", hex: "#001f3f", image: "/images/t-shirt-2.avif" },
      { name: "Gray", hex: "#808080", image: "/images/t-shirt-gray.jpg" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  { 
    id: 2,
    slug: "acme-bag",
    name: "acme bag", 
    price: 25, 
    image: "/images/bag-1-dark.jpg",
    colors: [
      { name: "Dark", hex: "#1a1a1a", image: "/images/bag-1-dark.jpg" },
      { name: "Brown", hex: "#8B4513", image: "/images/bag-1-brown.jpg" },
      { name: "Beige", hex: "#F5F5DC", image: "/images/bag-1-beige.jpg" }
    ],
    sizes: ["One Size"]
  },
  { 
    id: 3,
    slug: "acme-cup",
    name: "Acme cup", 
    price: 89, 
    image: "/images/cup-black.avif",
    colors: [
      { name: "Black", hex: "#000000", image: "/images/cup-black.avif" },
      { name: "White", hex: "#FFFFFF", image: "/images/cup-black.avif" }
    ]
  },
];

// Carousel products with color variations
const carouselProducts = [
  { 
    id: 4,
    slug: "acme-hoodie",
    name: "Acme Hoodie", 
    price: 19, 
    image: "/images/hoodie-1.avif",
    colors: [
      { name: "Black", hex: "#000000", image: "/images/hoodie-1.avif" },
      { name: "Gray", hex: "#808080", image: "/images/hoodie-2.avif" }
    ]
  },
  { 
    id: 5,
    slug: "acme-baby-cap",
    name: "acme Baby Cap", 
    price: 23, 
    image: "/images/baby-cap-black.avif",
    colors: [
      { name: "Black", hex: "#000000", image: "/images/baby-cap-black.avif" },
      { name: "Pink", hex: "#FFC0CB", image: "/images/baby-cap-pink.avif" },
      { name: "Blue", hex: "#4169E1", image: "/images/baby-cap-blue.avif" }
    ],
    sizes: ["0-6M", "6-12M", "12-24M"]
  },
  { 
    id: 6,
    slug: "acme-baby-onesie",
    name: "acme Baby Onesie", 
    price: 30, 
    image: "/images/baby-onesie-beige-1.avif",
    colors: [
      { name: "Beige", hex: "#F5F5DC", image: "/images/baby-onesie-beige-1.avif" },
      { name: "White", hex: "#FFFFFF", image: "/images/baby-onesie-white.avif" },
      { name: "Gray", hex: "#D3D3D3", image: "/images/baby-onesie-gray.avif" }
    ],
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"]
  },
  { 
    id: 7,
    slug: "acme-mug",
    name: "acme Mug", 
    price: 15, 
    image: "/images/mug-1.avif",
    colors: [
      { name: "White", hex: "#FFFFFF", image: "/images/mug-1.avif" },
      { name: "Black", hex: "#000000", image: "/images/mug-black.avif" },
      { name: "Blue", hex: "#4169E1", image: "/images/mug-blue.avif" }
    ]
  },
];

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log("Added to cart:", product); // ✅ use double quotes to avoid ESLint escape issue
  };

  if (!isMounted) {
    return (
      <div>
        <Navbar />
        <main className="max-w-7xl mb-2 mx-auto px-4 pt-2">
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <div className="md:w-[70%] flex justify-center">
              <div className="w-full h-[420px] bg-neutral-900 rounded-lg animate-pulse"></div>
            </div>
            <div className="md:w-[30%] flex flex-col gap-6">
              <div className="w-full h-[195px] bg-neutral-900 rounded-lg animate-pulse"></div>
              <div className="w-full h-[195px] bg-neutral-900 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mb-2 mx-auto px-4 pt-2">
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <div className="md:w-[70%] flex justify-center">
            <ProductCard product={featuredProducts[0]} big onAddToCart={handleAddToCart} />
          </div>
          <div className="md:w-[30%] flex flex-col gap-6">
            <ProductCard product={featuredProducts[1]} onAddToCart={handleAddToCart} />
            <ProductCard product={featuredProducts[2]} onAddToCart={handleAddToCart} />
          </div>
        </div>
      </main>

      {/* Moving Cards Section with different products */}
      <MovingCardsSection products={carouselProducts} onAddToCart={handleAddToCart} />
      <Footer />
    </div>
  );
}
