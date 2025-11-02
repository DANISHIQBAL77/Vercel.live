'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { CheckCircle, Package, Mail } from 'lucide-react';

export default function OrderSuccessPage() {
  const router = useRouter();
  
  // Generate random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-black py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-neutral-900 border border-gray-800 rounded-lg p-8 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-white mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-400 mb-8">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            {/* Order Number */}
            <div className="bg-black border border-gray-800 rounded-lg p-6 mb-8">
              <p className="text-gray-400 text-sm mb-2">Order Number</p>
              <p className="text-white text-2xl font-bold">{orderNumber}</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <Package className="w-8 h-8 text-blue-500 mb-3 mx-auto" />
                <h3 className="text-white font-semibold mb-1">Estimated Delivery</h3>
                <p className="text-gray-400 text-sm">5-7 business days</p>
              </div>

              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <Mail className="w-8 h-8 text-blue-500 mb-3 mx-auto" />
                <h3 className="text-white font-semibold mb-1">Confirmation Email</h3>
                <p className="text-gray-400 text-sm">Sent to your inbox</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => router.push('/orders')}
                className="bg-transparent border border-gray-800 hover:border-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}