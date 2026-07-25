import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import Button from '../../components/ui/Button';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCartStore();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout'); // Placeholder for checkout
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-xl border border-craft-100 shadow-sm">
          <p className="text-lg text-craft-800 mb-4">Your cart is empty</p>
          <Link to="/">
            <Button>Go Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.product} className="flex items-center bg-white p-4 rounded-xl border border-craft-100 shadow-sm">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                <div className="flex-1">
                  <Link to={`/product/${item.product}`} className="text-lg font-medium hover:text-accent">
                    {item.name}
                  </Link>
                  <p className="text-accent font-bold">NPR {item.priceAtPurchase.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product, e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-craft-800 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md"
                  >
                    {[...Array(10).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => removeFromCart(item.product)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl border border-craft-100 shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-4 border-b border-craft-100 pb-2">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span className="text-craft-800">Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
              <span className="font-medium">NPR {getCartTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6 pt-4 border-t border-craft-100">
              <span>Total</span>
              <span>NPR {getCartTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <Button onClick={checkoutHandler} className="w-full py-3 text-lg">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
