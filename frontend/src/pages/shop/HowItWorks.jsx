import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, UserCheck, Search, DollarSign, Store, ArrowRight, ArrowDown, Users, BadgeCheck, MessageSquare, AlertTriangle, ShoppingCart, X, Check } from 'lucide-react';
import Button from '../../components/ui/Button';

const HowItWorks = () => {
  return (
    <div className="font-sans text-craft-900 overflow-hidden bg-craft-50 -mt-8 pt-8">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-craft-900 leading-tight">
              From Artisan to Buyer – <br/><span className="text-accent">A Journey of Trust</span>
            </h1>
            <p className="text-xl text-craft-700 leading-relaxed max-w-lg">
              Discover how CraftConnect Nepal connects verified local artisans directly with buyers while eliminating unnecessary middlemen.
            </p>
            <div className="pt-4 flex gap-4">
              <Link to="/marketplace">
                <Button className="py-3 px-8 text-lg shadow-md hover:shadow-lg">Explore Marketplace</Button>
              </Link>
              <Link to="/register/artisan">
                <Button variant="outline" className="py-3 px-8 text-lg bg-white border-2">Become an Artisan</Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
            <img 
              src="/artisan-illustration.jpg" 
              alt="Artisan creating handmade crafts" 
              className="w-full h-auto object-cover rounded-3xl shadow-xl border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* 2. The Problem & 3. Our Solution */}
      <section className="bg-white py-20 border-y border-craft-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Why We Built CraftConnect</h2>
            <p className="text-lg text-craft-600 max-w-2xl mx-auto">The traditional supply chain hurts both makers and buyers. We are changing that.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            
            {/* The Problem */}
            <div className="bg-red-50 rounded-3xl p-8 border border-red-100 shadow-sm relative group">
              <div className="absolute -top-6 left-8 bg-red-100 text-red-800 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-sm border border-red-200">The Problem</div>
              
              <div className="flex flex-col items-center justify-center space-y-4 mt-8 mb-10">
                <div className="flex items-center justify-between w-full max-w-xs bg-white p-4 rounded-xl shadow-sm border border-red-100">
                  <span className="font-bold">Artisan</span>
                  <span className="text-red-500 text-xs font-bold bg-red-100 px-2 py-1 rounded">Low Pay</span>
                </div>
                <ArrowDown className="w-8 h-8 text-red-300" />
                <div className="flex items-center justify-center w-full max-w-xs bg-red-600 text-white p-4 rounded-xl shadow-md">
                  <span className="font-bold">Middleman (Markup)</span>
                </div>
                <ArrowDown className="w-8 h-8 text-red-300" />
                <div className="flex items-center justify-between w-full max-w-xs bg-white p-4 rounded-xl shadow-sm border border-red-100">
                  <span className="font-bold">Buyer</span>
                  <span className="text-red-500 text-xs font-bold bg-red-100 px-2 py-1 rounded">High Price</span>
                </div>
              </div>

              <ul className="space-y-4 text-red-900 font-medium">
                <li className="flex items-start"><X className="w-6 h-6 mr-3 text-red-500 shrink-0" /> Artisans earn a fraction of the selling price.</li>
                <li className="flex items-start"><X className="w-6 h-6 mr-3 text-red-500 shrink-0" /> Buyers overpay due to multiple markups.</li>
                <li className="flex items-start"><X className="w-6 h-6 mr-3 text-red-500 shrink-0" /> Authenticity is incredibly difficult to verify.</li>
              </ul>
            </div>

            {/* Our Solution */}
            <div className="bg-green-50 rounded-3xl p-8 border border-green-100 shadow-sm relative group">
              <div className="absolute -top-6 left-8 bg-green-100 text-green-800 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-sm border border-green-200">Our Solution</div>
              
              <div className="flex flex-col items-center justify-center space-y-4 mt-8 mb-10">
                <div className="flex items-center justify-between w-full max-w-xs bg-white p-4 rounded-xl shadow-sm border border-green-200">
                  <span className="font-bold flex items-center"><UserCheck className="w-4 h-4 mr-2 text-green-600"/> Artisan</span>
                  <span className="text-green-700 text-xs font-bold bg-green-100 px-2 py-1 rounded">Fair Pay</span>
                </div>
                <ArrowDown className="w-8 h-8 text-green-400" />
                <div className="flex items-center justify-center w-full max-w-xs bg-accent text-white p-4 rounded-xl shadow-md">
                  <span className="font-bold flex items-center"><Store className="w-5 h-5 mr-2"/> CraftConnect Nepal</span>
                </div>
                <ArrowDown className="w-8 h-8 text-green-400" />
                <div className="flex items-center justify-between w-full max-w-xs bg-white p-4 rounded-xl shadow-sm border border-green-200">
                  <span className="font-bold">Buyer</span>
                  <span className="text-green-700 text-xs font-bold bg-green-100 px-2 py-1 rounded">Fair Price</span>
                </div>
              </div>

              <ul className="space-y-4 text-green-900 font-medium grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <li className="flex items-center"><Check className="w-5 h-5 mr-2 text-green-600 shrink-0" /> Direct Connection</li>
                <li className="flex items-center"><Check className="w-5 h-5 mr-2 text-green-600 shrink-0" /> Fair Pricing</li>
                <li className="flex items-center"><Check className="w-5 h-5 mr-2 text-green-600 shrink-0" /> Verified Artisans</li>
                <li className="flex items-center"><Check className="w-5 h-5 mr-2 text-green-600 shrink-0" /> Digital Passport</li>
                <li className="flex items-center"><Check className="w-5 h-5 mr-2 text-green-600 shrink-0" /> Full Transparency</li>
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* 4. How It Works (Timeline) */}
      <section className="py-24 bg-craft-50 overflow-hidden relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4">The Journey</h2>
            <p className="text-lg text-craft-600 max-w-2xl mx-auto">From registration to a fair sale, here is exactly how our platform works.</p>
          </div>

          <div className="space-y-12">
            {[
              { step: 1, title: 'Artisan Registers', desc: 'Local makers sign up with their details and craft background.', icon: <Users /> },
              { step: 2, title: 'Admin Verifies Identity', desc: 'Our team carefully reviews documents and workshop photos.', icon: <ShieldCheck /> },
              { step: 3, title: 'Upload Handmade Products', desc: 'Verified artisans list their authentic items with transparent pricing.', icon: <Store /> },
              { step: 4, title: 'Buyer Explores', desc: 'Shoppers browse a curated marketplace of genuine goods.', icon: <Search /> },
              { step: 5, title: 'Digital Craft Passport', desc: 'Buyers view the unique story and origin of the product via QR.', icon: <BadgeCheck /> },
              { step: 6, title: 'Buyer Places Order', desc: 'Secure purchase supporting the artisan directly.', icon: <ShoppingCart /> },
              { step: 7, title: 'Review or Report', desc: 'Buyers leave reviews or report items to maintain platform trust.', icon: <AlertTriangle /> },
              { step: 8, title: 'Artisan Earns Fairly', desc: 'The artisan receives their full, fair cut of the sale.', icon: <DollarSign /> },
            ].map((item, idx) => (
              <div key={item.step} className={`flex items-center ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative group`}>
                
                {/* Connecting Line (except last) */}
                {idx !== 7 && (
                  <div className="absolute top-1/2 left-1/2 w-0.5 h-24 bg-craft-300 -translate-x-1/2 translate-y-8 hidden md:block"></div>
                )}
                
                <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'} hidden md:block`}>
                  <h3 className="text-2xl font-bold text-craft-900 group-hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-craft-600 mt-2">{item.desc}</p>
                </div>
                
                <div className="w-16 h-16 rounded-full bg-white border-4 border-craft-200 flex items-center justify-center text-accent shadow-md z-10 group-hover:scale-110 group-hover:border-accent transition-all shrink-0 mx-auto md:mx-0">
                  <div className="w-8 h-8">{item.icon}</div>
                </div>
                
                <div className="w-1/2 pl-6 md:hidden">
                  <h3 className="text-lg font-bold text-craft-900">{item.title}</h3>
                  <p className="text-sm text-craft-600 mt-1">{item.desc}</p>
                </div>
                
                <div className={`w-1/2 ${idx % 2 === 0 ? 'pl-8' : 'pr-8'} hidden md:block opacity-0`}>Spacer</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trust & Transparency */}
      <section className="bg-craft-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-16">Pillars of Trust</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-craft-800 p-8 rounded-3xl hover:bg-craft-700 transition-colors">
              <UserCheck className="w-12 h-12 text-accent mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3">Verified Artisan</h3>
              <p className="text-craft-400 text-sm">Every seller passes a rigorous manual verification process.</p>
            </div>
            
            <div className="bg-craft-800 p-8 rounded-3xl hover:bg-craft-700 transition-colors">
              <BadgeCheck className="w-12 h-12 text-accent mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3">Craft Passport</h3>
              <p className="text-craft-400 text-sm">Scan a QR code to view the unique origin story of each product.</p>
            </div>
            
            <div className="bg-craft-800 p-8 rounded-3xl hover:bg-craft-700 transition-colors">
              <MessageSquare className="w-12 h-12 text-accent mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3">Buyer Reviews</h3>
              <p className="text-craft-400 text-sm">Read honest feedback from community members who bought the item.</p>
            </div>
            
            <div className="bg-craft-800 p-8 rounded-3xl hover:bg-craft-700 transition-colors">
              <AlertTriangle className="w-12 h-12 text-accent mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3">Report Product</h3>
              <p className="text-craft-400 text-sm">Help moderate the platform by flagging suspicious activity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose CraftConnect Nepal */}
      <section className="py-24 bg-white border-b border-craft-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4 text-craft-900">Why Choose Us?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-craft-50 p-10 rounded-[2.5rem] border border-craft-200 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4 flex items-center text-craft-900"><span className="text-3xl mr-3">🚫</span> No Unnecessary Middlemen</h3>
              <p className="text-craft-700 leading-relaxed text-lg">We remove the intermediaries that inflate prices and squeeze margins, connecting buyers directly to the source.</p>
            </div>
            <div className="bg-craft-50 p-10 rounded-[2.5rem] border border-craft-200 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4 flex items-center text-craft-900"><span className="text-3xl mr-3">💰</span> Fair Earnings</h3>
              <p className="text-craft-700 leading-relaxed text-lg">Artisans set their own prices and take home what they actually deserve for their hard work and skill.</p>
            </div>
            <div className="bg-craft-50 p-10 rounded-[2.5rem] border border-craft-200 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4 flex items-center text-craft-900"><span className="text-3xl mr-3">🛡</span> Authentic Handmade Products</h3>
              <p className="text-craft-700 leading-relaxed text-lg">Strict verification ensures that you are buying genuine, handcrafted goods rather than mass-produced factory items.</p>
            </div>
            <div className="bg-craft-50 p-10 rounded-[2.5rem] border border-craft-200 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4 flex items-center text-craft-900"><span className="text-3xl mr-3">❤️</span> Preserving Nepalese Heritage</h3>
              <p className="text-craft-700 leading-relaxed text-lg">By supporting local craftsmen, you help keep ancient Nepalese arts, crafts, and traditions alive for future generations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Call To Action */}
      <section className="bg-accent text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8">Support Local Artisans Today.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/marketplace">
              <Button className="w-full sm:w-auto py-4 px-10 text-lg font-bold bg-craft-900 text-white hover:bg-craft-800 shadow-xl border-none">
                Explore Marketplace <ArrowRight className="ml-2 w-5 h-5 inline" />
              </Button>
            </Link>
            <Link to="/register/artisan">
              <Button className="w-full sm:w-auto py-4 px-10 text-lg font-bold !bg-white !text-accent hover:!bg-craft-50 shadow-xl border-none">
                Become a Verified Artisan
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HowItWorks;
