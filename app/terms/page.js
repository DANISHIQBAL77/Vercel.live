// app/terms/page.js
import Navbar from "../components/navbar";
import Footer from "../components/footer";
export default function TermsPage() {
  return (
    <div className="">
      <Navbar/>
      <div className="min-h-screen bg-black text-white flex justify-center px-6 py-8">
        <div className="max-w-2xl space-y-6 w-full border-b border-gray-700 ">
          {/* Heading */}
          <h1 className="text-4xl font-bold">Terms & Conditions</h1>

          {/* Description */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam libero
            justo laoreet sit amet cursus sit. Dictumst quisque sagittis purus sit
            amet volutpat consequat. Egestas diam in arcu cursus euismod. Sed
            faucibus turpis in eu mi bibendum. Consectetur libero id faucibus
            nisl. Quisque id diam vel quam elementum. Eros donec ac odio tempor
            orci dapibus ultrices. Turpis tincidunt id aliquet risus. Pellentesque
            eu tincidunt tortor aliquam nulla facilisi cras fermentum odio.
          </p>

          {/* Last Updated */}
          <p className="italic text-gray-300">
            This document was last updated on April 20, 2023.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}