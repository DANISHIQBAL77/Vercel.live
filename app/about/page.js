
import Navbar from "../components/navbar";
import Footer from "../components/footer";
// app/about/page.js
export default function AboutPage() {
  return (
  <div className=""> 
  <Navbar/>
    <div className="min-h-screen bg-black text-white   border-b border-gray-700 flex justify-center px-6 py-12">
      <div className="max-w-2xl space-y-6">
        {/* Heading */}
        <h1 className="text-4xl font-bold">About</h1>

        {/* Description */}
        <p>
          This website is built with{" "}
          <a
            href="https://nextjs.org/commerce"
            className="text-blue-400 hover:underline"
          >
            Next.js Commerce
          </a>
          , which is an ecommerce template for creating a headless Shopify storefront.
        </p>

        {/* Real-world commerce features */}
        <div>
          <p className="font-semibold mb-2">
            Support for real-world commerce features including:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>Out of stocks</li>
            <li>Order history</li>
            <li>Order status</li>
            <li>
              Cross variant / option availability (aka. Amazon style)
            </li>
            <li>
              <a
                href="#"
                className="text-blue-400 hover:underline"
              >
                Hidden products
              </a>
            </li>
            <li>
              Dynamically driven content and features via Shopify (ie. collections,
              menus, pages, etc.)
            </li>
            <li>
              Seamless and secure checkout via{" "}
              <a
                href="https://www.shopify.com/checkout"
                className="text-blue-400 hover:underline"
              >
                Shopify Checkout
              </a>
            </li>
            <li>And more!</li>
          </ul>
        </div>

        {/* Next.js features */}
        <div>
          <p className="font-semibold mb-2">
            This template also allows us to highlight newer Next.js features including:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>Next.js App Router</li>
            <li>Optimized for SEO using Next.js's Metadata</li>
            <li>React Server Components (RSCs) and Suspense</li>
            <li>Server Actions for mutations</li>
            <li>Edge runtime</li>
            <li>New Next.js 13 fetching and caching paradigms</li>
            <li>Dynamic OG images</li>
            <li>Styling with Tailwind CSS</li>
            <li>Automatic light/dark mode based on system settings</li>
            <li>And more!</li>
          </ul>
        </div>

        {/* Footer note */}
        <p className="text-gray-400 italic text-sm">
          This document was last updated on July 18, 2023.
        </p>
      </div>
    </div>
    <Footer/>
    </div> 
  );
}