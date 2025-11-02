// pages/faq.js
import Navbar from "../components/navbar";
import Footer from "../components/footer";
export default function FAQ() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Frequently <br /> Asked <br /> Questions
        </h1>

        <p className="text-lg leading-relaxed text-gray-200 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam libero
          justo laoreet sit amet cursus sit. Dictumst quisque sagittis purus sit
          amet volutpat consequat. Egestas diam in arcu cursus euismod. Sed
          faucibus turpis in eu mi bibendum. Consectetur libero id faucibus nisl.
          Quisque id diam vel quam elementum. Eros donec ac odio tempor orci
          dapibus ultrices. Turpis tincidunt id aliquet risus. Pellentesque eu
          tincidunt tortor aliquam nulla facilisi cras fermentum odio.
        </p>

        <p className="text-gray-400 italic text-sm">
          This document was last updated on April 20, 2023.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
}