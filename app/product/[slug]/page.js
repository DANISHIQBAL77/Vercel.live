'use client';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';

// =========================
// PRODUCT DATA
// =========================
const allProducts = [
  { 
    id: 1,
    slug: "black-hoodie",
    name: "Acme Circles T-Shirt", 
    price: 49, 
    image: "/images/t-shirt-1.jpg",
    colors: [
      { name: "Black", hex: "#000000", image: "/images/t-shirt-1.jpg" },
      { name: "white", hex: "white", image: "/images/t-shirt-2.avif" },
      { name: "blue", hex: "blue", image: "/images/t-shirt-circles-blue.avif" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Premium quality hoodie perfect for everyday wear. Made with soft, durable materials."
  },
  { 
    id: 2,
    slug: "acme-bag",
    name: "acme bag", 
    price: 25, 
    image: "/images/bag-1-dark.jpg",
    colors: [
      { name: "Dark", hex: "#1a1a1a", image: "/images/bag-1-dark.jpg" },
      { name: "white", hex: "#8B4513", image: "/images/bag-1-light.avif" },
    ],
    sizes: ["6 x 8 inch","7 x 9 inch","8 x 11 inch","9 x 12 inch","10 x 15 inch","12 x 16 inch"],
    description: "Stylish and practical bag for all occasions."
  },
  {  
    id: 3,
    slug: "acme-cup",
    name: "Acme cup", 
    price: 89, 
    image: "/images/cup-black.avif",
    colors: [
      { name: "Black", hex: "#000000", image: "/images/cup-black.avif" },
      { name: "White", hex: "#FFFFFF", image: "/images/cup-white.avif" },
    ],
    description: "High-quality ceramic cup for your favorite beverages."
  },
  { 
    id: 4,
    slug: "acme-hoodie",
    name: "acme hoodie", 
    price: 19, 
    image: "/images/hoodie-1.avif",
    colors: [
      { name: "Black", hex: "#000000", image: "/images/hoodie-1.avif" },
      { name: "Gray", hex: "#808080", image: "/images/hoodie-2.avif" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Comfortable acme hoodie with modern design."
  },
  { 
    id: 5,
    slug: "acme-baby-cap",
    name: "Acme Baby Cap", 
    price: 23, 
    image: "/images/baby-cap-black.avif",
    colors: [
      { name: "Black", hex: "#000000", image: "/images/baby-cap-black.avif" },
      { name: "gray", hex: "#FFC0CB", image: "/images/baby-cap-gray.avif" },
      { name: "white", hex: "#4169E1", image: "/images/baby-cap-white.avif" }
    ],
    description: "100% combed ringspun cotton"
  },
  { 
    id: 6,
    slug: "acme-baby-onesie",
    name: "acme Baby Onesie", 
    price: 30, 
    image: "/images/baby-onesie-beige-1.avif",
    colors: [
      { name: "black", hex: "#F5F5DC", image: "/images/baby-onesie-black-1.avif" },
      { name: "White", hex: "#FFFFFF", image: "/images/baby-onesie-white-1.avif" },
      { name: "Beige", hex: "#D3D3D3", image: "/images/baby-onesie-beige-1.avif" }
    ],
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
    description: "Comfortable baby onesie for your little one."
  },
  { 
    id: 7,
    slug: "acme-mug",
    name: "Acme Mug", 
    price: 15, 
    image: "/images/mug-1.avif",        
    colors: [
      { name: "black", hex: "#F5F5DC", image: "/images/mug-1.avif" },
    ],
    description: "12 oz Beck Cork-Bottom Mug."
  },
];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.slug === params.slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors?.[0] || null);
      setSelectedSize(foundProduct.sizes?.[0] || null);
    }
  }, [params.slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const galleryImages = product.colors?.map(c => c.image) || [product.image];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity
    });
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-black mx-8 rounded-lg border border-gray-800 p-6">
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* =================== IMAGE GALLERY =================== */}
            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                <Image
                  src={galleryImages[currentImageIndex]}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain rounded-xl transition-all duration-300"
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-700 text-white rounded-full p-2"
                >
                  ←
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-700 text-white rounded-full p-2"
                >
                  →
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      currentImageIndex === index
                        ? 'border-blue-500'
                        : 'border-transparent hover:border-gray-600'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index}`}
                      width={60}
                      height={60}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* =================== PRODUCT DETAILS =================== */}
            <div className="flex-1 space-y-2">
              <div className="border-b pb-3 border-gray-800">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {product.name}
                </h1>
                <div className="inline-block text-white text-lg bg-blue-600 px-3 sm:px-4 py-1 rounded-full font-medium">
                  ${product.price}.00 USD
                </div>
              </div>

              {/* Color Selection */}
              {product.colors?.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-md font-semibold text-white">Color:</h3>
                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedColor(color);
                          setCurrentImageIndex(index);
                        }}
                        className={`px-4 py-1 rounded-full border font-medium text-sm transition-all ${
                          selectedColor?.name === color.name
                            ? 'border-blue-500 bg-gray-800 text-white scale-105'
                            : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-blue-500 hover:scale-105'
                        }`}
                      >
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes?.length > 0 && (
                <div className="space-y-2 py-2">
                  <h3 className="text-md font-semibold text-white">Size</h3>
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-1 rounded-full border font-medium text-sm transition-all ${
                          selectedSize === size
                            ? 'border-blue-500 bg-gray-800 text-white scale-105'
                            : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-blue-500 hover:scale-105'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-3 pt-6">
                <p className="text-gray-400 text-lg leading-relaxed">
                  {product.description || "This is a high-quality product that meets all your needs."}
                </p>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-5 mt-7 px-8 rounded-4xl text-xl transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
