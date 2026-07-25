import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Package, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';

const PaymentSuccess = () => {
  const { id } = useParams();

  return (
    <div className="font-sans text-craft-900 min-h-[80vh] flex items-center justify-center bg-craft-50 p-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl text-center animate-in zoom-in-95 duration-500 border border-craft-100">
        
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle2 className="w-14 h-14 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-extrabold mb-2">Order Confirmed!</h1>
        <p className="text-craft-600 mb-8 leading-relaxed">
          Thank you for supporting local artisans. Your order has been placed successfully.
        </p>

        <div className="bg-craft-50 rounded-2xl p-4 mb-8 text-left border border-craft-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-craft-500 uppercase tracking-wider mb-1">Order ID</p>
            <p className="font-mono font-bold text-sm text-craft-900 truncate pr-4">#{id}</p>
          </div>
          <Package className="w-8 h-8 text-accent opacity-50 shrink-0" />
        </div>

        <div className="space-y-4">
          <Link to="/dashboard" className="block">
            <Button className="w-full py-4 text-lg font-bold shadow-md hover:shadow-lg flex items-center justify-center">
              View Order Details <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/marketplace" className="block text-center font-bold text-craft-600 hover:text-accent transition-colors flex items-center justify-center py-2">
            <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default PaymentSuccess;
