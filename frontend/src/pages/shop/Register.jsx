import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Brush } from 'lucide-react';
import Button from '../../components/ui/Button';

const Register = () => {
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '';
  const redirectParam = redirect ? `?redirect=${redirect}` : '';

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-craft-900 tracking-tight">Join CraftConnect</h2>
        <p className="text-craft-500 mt-3 text-lg">Choose how you'd like to use our platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        
        {/* Buyer Card */}
        <div className="bg-white rounded-3xl p-8 border border-craft-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-craft-900 mb-4">🛍 Buyer</h3>
          <p className="text-craft-800 flex-grow mb-8 leading-relaxed">
            Purchase authentic handmade crafts directly from verified Nepali artisans. Support local economy and discover unique items.
          </p>
          <Link to={`/register/buyer${redirectParam}`} className="w-full">
            <Button className="w-full py-4 text-lg">Register as Buyer</Button>
          </Link>
        </div>

        {/* Artisan Card */}
        <div className="bg-white rounded-3xl p-8 border border-craft-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-craft-100 rounded-full flex items-center justify-center mb-6">
            <Brush className="w-10 h-10 text-craft-900" />
          </div>
          <h3 className="text-2xl font-bold text-craft-900 mb-4">👩‍🎨 Artisan</h3>
          <p className="text-craft-800 flex-grow mb-8 leading-relaxed">
            Sell your handmade crafts directly to buyers and receive fair earnings without unnecessary middlemen.
          </p>
          <Link to={`/register/artisan${redirectParam}`} className="w-full">
            <Button variant="outline" className="w-full py-4 text-lg">Register as Artisan</Button>
          </Link>
        </div>

      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-craft-600">
          Already have an account?{' '}
          <Link to={`/login${redirectParam}`} className="font-medium text-accent hover:text-accent-hover transition-colors">
            Sign In Here
          </Link>
        </p>
      </div>

    </div>
  );
};

export default Register;
