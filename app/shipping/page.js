// app/shipping-policy/page.js
import Navbar from "../components/navbar";
import Footer from "../components/footer";
export default function ShippingPolicy() {
  return (
    <>
    <Navbar/>
    
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
        
      <div className="max-w-3xl w-full border-b border-gray-700 pb-8">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold leading-tight">
          Shipping & <br /> Return <br /> Policy
        </h1>

        {/* Body Text */}
        <p className="mt-6 text-lg leading-relaxed text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Nam libero justo laoreet
          sit amet cursus sit. Dictumst quisque sagittis purus sit amet volutpat
          consequat. Egestas diam in arcu cursus euismod. Sed faucibus turpis in eu mi
          bibendum. Consectetur libero id faucibus nisl. Quisque id diam vel quam
          elementum. Eros donec ac odio tempor orci dapibus ultrices. Turpis tincidunt
          id aliquet risus. Pellentesque eu tincidunt tortor aliquam nulla facilisi
          cras fermentum odio.
        </p>

        {/* Footer Note */}
        <p className="mt-8 italic text-gray-400">
          This document was last updated on April 20, 2023.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
}