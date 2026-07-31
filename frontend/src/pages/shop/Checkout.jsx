import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import { MapPin, Phone, User, Building, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Checkout = () => {
  const { cartItems, clearCart } = useCartStore();
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  const [shippingAddress, setShippingAddress] = useState({
    fullName: userInfo?.name || '',
    address: '',
    city: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('eSewa');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=checkout');
    }
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [userInfo, navigate, cartItems]);

  // Calculate totals
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.priceAtPurchase * item.quantity, 0);
  const shippingPrice = subtotal > 5000 ? 0 : 150; // Free shipping over Rs. 5000
  const totalAmount = subtotal + shippingPrice;

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.phone) {
      toast.error('Please fill in all shipping details');
      return;
    }

    try {
      setIsProcessing(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // 1. Create the Order
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems.map(item => ({
            product: item.product,
            name: item.name,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase
          })),
          shippingAddress,
          paymentMethod,
          shippingPrice,
          totalAmount,
        },
        config
      );

      // 2. Handle Payment Flow
      if (paymentMethod === 'COD') {
        clearCart();
        toast.success('Your order has been placed successfully.');
        navigate(`/payment/success/${data._id}`);
      } else {
        // Automatically mock successful payment for eSewa / Khalti
        await axios.put(`/api/orders/${data._id}/pay`, { transactionId: `MOCK_${paymentMethod.toUpperCase()}_${Date.now()}` }, config);
        clearCart();
        toast.success(`Successful payment with ${paymentMethod}! Your order has been placed successfully.`);
        navigate(`/payment/success/${data._id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error placing order');
      setIsProcessing(false);
    }
  };

  return (
    <div className="font-sans text-craft-900 min-h-screen bg-craft-50 pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>
          <p className="text-craft-600 mt-2">Complete your purchase securely.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Shipping Address */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-craft-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-accent" /> Shipping Details
              </h2>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-craft-800 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="w-5 h-5 text-craft-400 absolute left-4 top-3.5" />
                    <input 
                      type="text" 
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-craft-50 border border-craft-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-shadow" 
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-craft-800 mb-2">City / District</label>
                    <div className="relative">
                      <Building className="w-5 h-5 text-craft-400 absolute left-4 top-3.5" />
                      <input 
                        type="text" 
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-craft-50 border border-craft-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-shadow" 
                        placeholder="e.g. Kathmandu"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-craft-800 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-5 h-5 text-craft-400 absolute left-4 top-3.5" />
                      <input 
                        type="text" 
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-craft-50 border border-craft-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-shadow" 
                        placeholder="e.g. 98XXXXXXXX"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-craft-800 mb-2">Detailed Address</label>
                  <textarea 
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-5 py-4 bg-craft-50 border border-craft-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-shadow resize-none" 
                    placeholder="Street name, landmark, etc."
                    required
                  ></textarea>
                </div>
              </form>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-craft-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <ShieldCheck className="w-6 h-6 mr-3 text-accent" /> Payment Method
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* eSewa */}
                <div 
                  className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex flex-col items-center justify-center text-center h-32 ${paymentMethod === 'eSewa' ? 'border-[#60bb46] bg-[#60bb46]/5' : 'border-craft-200 hover:border-craft-300'}`}
                  onClick={() => setPaymentMethod('eSewa')}
                >
                  <div className="w-6 h-6 rounded-full border-2 border-[#60bb46] mb-2 flex items-center justify-center">
                    {paymentMethod === 'eSewa' && <div className="w-3 h-3 bg-[#60bb46] rounded-full"></div>}
                  </div>
                  <span className="font-extrabold text-xl text-[#60bb46]">eSewa</span>
                </div>

                {/* Khalti */}
                <div 
                  className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex flex-col items-center justify-center text-center h-32 ${paymentMethod === 'Khalti' ? 'border-[#5C2D91] bg-[#5C2D91]/5' : 'border-craft-200 hover:border-craft-300'}`}
                  onClick={() => setPaymentMethod('Khalti')}
                >
                  <div className="w-6 h-6 rounded-full border-2 border-[#5C2D91] mb-2 flex items-center justify-center">
                    {paymentMethod === 'Khalti' && <div className="w-3 h-3 bg-[#5C2D91] rounded-full"></div>}
                  </div>
                  <span className="font-extrabold text-xl text-[#5C2D91]">Khalti</span>
                </div>

                {/* COD */}
                <div 
                  className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex flex-col items-center justify-center text-center h-32 ${paymentMethod === 'COD' ? 'border-accent bg-accent/5' : 'border-craft-200 hover:border-craft-300'}`}
                  onClick={() => setPaymentMethod('COD')}
                >
                  <div className="w-6 h-6 rounded-full border-2 border-accent mb-2 flex items-center justify-center">
                    {paymentMethod === 'COD' && <div className="w-3 h-3 bg-accent rounded-full"></div>}
                  </div>
                  <span className="font-bold text-craft-900">Cash on Delivery</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-craft-100 sticky top-28">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="w-12 h-12 rounded-lg bg-craft-100 flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div className="truncate">
                        <p className="font-bold text-craft-900 truncate">{item.name}</p>
                        <p className="text-craft-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold whitespace-nowrap ml-2">Rs. {addDecimals(item.priceAtPurchase * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-craft-100 pt-4 space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-craft-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-craft-900">Rs. {addDecimals(subtotal)}</span>
                </div>
                <div className="flex justify-between text-craft-600">
                  <span>Shipping</span>
                  <span className="font-medium text-craft-900">
                    {shippingPrice === 0 ? <span className="text-[#60bb46]">Free</span> : `Rs. ${addDecimals(shippingPrice)}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-craft-100 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-extrabold text-accent">Rs. {addDecimals(totalAmount)}</span>
                </div>
              </div>

              <Button 
                onClick={placeOrderHandler} 
                disabled={isProcessing}
                className="w-full py-4 text-lg font-bold shadow-xl flex items-center justify-center"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Checkout;
