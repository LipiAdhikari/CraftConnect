import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import Button from '../../components/ui/Button';

const PaymentFailed = () => {
  return (
    <div className="font-sans text-craft-900 min-h-[80vh] flex items-center justify-center bg-craft-50 p-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl text-center animate-in zoom-in-95 duration-500 border border-red-100">
        
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <XCircle className="w-14 h-14 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-extrabold mb-2 text-red-600">Payment Failed</h1>
        <p className="text-craft-600 mb-8 leading-relaxed">
          We couldn't process your payment. Please ensure you have sufficient balance or try another payment method.
        </p>

        <div className="space-y-4">
          <Link to="/checkout" className="block">
            <Button className="w-full py-4 text-lg font-bold shadow-md hover:shadow-lg flex items-center justify-center !bg-red-600 hover:!bg-red-700">
              <RotateCcw className="w-5 h-5 mr-2" /> Try Again
            </Button>
          </Link>
          <Link to="/cart" className="block text-center font-bold text-craft-600 hover:text-red-600 transition-colors flex items-center justify-center py-2">
            <ArrowLeft className="w-4 h-4 mr-2" /> Return to Cart
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default PaymentFailed;
