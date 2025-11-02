'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { CreditCard, Smartphone, Building2, Check } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card'); // card, bank, mobile
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Your cart is empty</h1>
            <p className="text-gray-400 mb-6">Add some products to checkout</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) return;
    }

    // Format CVV
    if (name === 'cvv' && value.length > 3) return;

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';

    if (paymentMethod === 'card') {
      if (!cardData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!cardData.cardName) newErrors.cardName = 'Cardholder name is required';
      if (!cardData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!cardData.cvv) newErrors.cvv = 'CVV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      router.push('/order-success');
    }, 2000);
  };

  const subtotal = getTotalPrice();
  const shipping = 10;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-black py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-neutral-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-black border ${errors.email ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Shipping Address */}
              <div className="bg-neutral-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-black border ${errors.firstName ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600`}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-black border ${errors.lastName ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600`}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-black border ${errors.address ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600`}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}

                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-black border ${errors.city ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600`}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-black border ${errors.postalCode ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600`}
                      />
                      {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                    </div>
                  </div>

                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-black border ${errors.country ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600`}
                  />
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (optional)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-neutral-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Payment Method</h2>
                
                {/* Payment Options */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-600/10'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-white" />
                    <span className="text-white text-sm">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mobile')}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'mobile'
                        ? 'border-blue-600 bg-blue-600/10'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <Smartphone className="w-6 h-6 text-white" />
                    <span className="text-white text-sm">Mobile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-blue-600 bg-blue-600/10'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <Building2 className="w-6 h-6 text-white" />
                    <span className="text-white text-sm">Bank</span>
                  </button>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={cardData.cardNumber}
                      onChange={handleCardInputChange}
                      className={`w-full px-4 py-3 bg-black border ${errors.cardNumber ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}

                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder Name"
                      value={cardData.cardName}
                      onChange={handleCardInputChange}
                      className={`w-full px-4 py-3 bg-black border ${errors.cardName ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600`}
                    />
                    {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={cardData.expiryDate}
                          onChange={handleCardInputChange}
                          className={`w-full px-4 py-3 bg-black border ${errors.expiryDate ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600`}
                        />
                        {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={cardData.cvv}
                          onChange={handleCardInputChange}
                          className={`w-full px-4 py-3 bg-black border ${errors.cvv ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600`}
                        />
                        {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Payment */}
                {paymentMethod === 'mobile' && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Mobile payment options coming soon</p>
                  </div>
                )}

                {/* Bank Transfer */}
                {paymentMethod === 'bank' && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Bank transfer options coming soon</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="bg-neutral-900 border border-gray-800 rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {cart.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-16 h-16 bg-black rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.selectedColor?.image || item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white text-sm font-medium truncate">{item.name}</h3>
                        <p className="text-gray-400 text-xs">
                          {item.selectedColor?.name && `${item.selectedColor.name}`}
                          {item.selectedSize && ` • ${item.selectedSize}`}
                        </p>
                        <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-white text-sm font-medium">
                        ${item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-800 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${subtotal}.00</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span>${shipping}.00</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span>${tax}.00</span>
                  </div>
                  <div className="flex justify-between text-white text-lg font-bold pt-2 border-t border-gray-800">
                    <span>Total</span>
                    <span>${total}.00 USD</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Complete Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}