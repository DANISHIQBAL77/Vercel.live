// pages/privacy.js
import Navbar from "../components/navbar";
import Footer from "../components/footer";
export default function PrivacyPolicy() {
  return (
    <>
    <Navbar/>
    <div className=" bg-black text-white border-b border-gray-700 flex items-center justify-center px-6 py-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-lg leading-relaxed mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam libero justo laoreet sit amet cursus sit. Dictumst quisque sagittis purus sit amet volutpat consequat. Egestas diam in arcu cursus euismod. Sed faucibus turpis in eu mi bibendum. Consectetur libero id faucibus nisl. Quisque id diam vel quam elementum. Eros donec ac odio tempor orci dapibus ultrices. Turpis tincidunt id aliquet risus. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio.
        </p>
        <p className="text-sm italic text-gray-400 mt-6">
          This document was last updated on April 20, 2023.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  )
}