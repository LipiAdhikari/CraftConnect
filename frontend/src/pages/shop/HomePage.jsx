import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, HeartHandshake, Globe, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const marketplaceRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data.slice(0, 4)); // Only show 4 featured products on homepage
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scrollToMarketplace = () => {
    marketplaceRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col space-y-20 -mt-8 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center rounded-3xl overflow-hidden mt-8 shadow-2xl">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-in fade-in zoom-in duration-[2000ms]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-craft-900/40 z-10"></div>
        
        {/* Hero Content with Glassmorphism */}
        <div className="relative z-20 max-w-3xl mx-4 p-8 md:p-12 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="inline-block py-1.5 px-4 rounded-full bg-accent/90 text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            The Artisan Marketplace
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white drop-shadow-md leading-tight">
            Direct from the <br className="hidden md:block"/> <span className="text-accent-hover">Maker's Hands.</span>
          </h1>
          <p className="text-lg md:text-xl text-craft-50 mb-10 max-w-2xl mx-auto drop-shadow leading-relaxed font-medium">
            Empowering Nepali craftsmen by eliminating middlemen. Discover verified handmade goods with 100% transparent pricing and authentic stories.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/marketplace" className="w-full sm:w-auto">
              <Button className="w-full text-lg px-8 py-4 bg-accent hover:bg-white hover:text-accent transition-all shadow-xl">
                Shop the Marketplace
              </Button>
            </Link>
            <Button variant="outline" onClick={scrollToMarketplace} className="w-full sm:w-auto text-lg px-8 py-4 bg-white/10 text-white border-white/30 hover:bg-white hover:text-craft-900 backdrop-blur-sm transition-all shadow-lg">
              How it Works
            </Button>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-craft-100 text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 bg-craft-100 rounded-full flex items-center justify-center mb-6 text-accent shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-craft-900 mb-3">100% Verified Authentic</h3>
          <p className="text-craft-800 leading-relaxed">
            Every product comes with a digital authenticity passport. Scan the QR code to read the artisan's exact story.
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-craft-100 text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 bg-craft-100 rounded-full flex items-center justify-center mb-6 text-accent shadow-inner">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-craft-900 mb-3">Fair Trade Pricing</h3>
          <p className="text-craft-800 leading-relaxed">
            We break down exactly where your money goes. See the artisan's cut, materials cost, and our minimal platform fee.
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-craft-100 text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 bg-craft-100 rounded-full flex items-center justify-center mb-6 text-accent shadow-inner">
            <Globe className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-craft-900 mb-3">Direct Connection</h3>
          <p className="text-craft-800 leading-relaxed">
            No middlemen, no massive markups. You are buying directly from the local workshops and homes of the creators.
          </p>
        </div>
      </section>

      {/* FEATURED MARKETPLACE PREVIEW */}
      <section ref={marketplaceRef} className="pt-8 scroll-mt-24">
        <div className="flex justify-between items-end mb-10 px-2">
          <div>
            <h2 className="text-3xl font-bold text-craft-900 mb-2">Featured Selection</h2>
            <p className="text-craft-800">Hand-picked authentic goods waiting for a home.</p>
          </div>
          <Link to="/marketplace" className="hidden sm:flex items-center text-accent font-semibold hover:text-accent-hover transition-colors">
            View All in Marketplace <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 animate-pulse">
            <div className="w-12 h-12 border-4 border-craft-200 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-craft-800 font-medium">Curating items...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-craft-100">
            <p className="text-lg text-craft-800 font-medium">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`} className="group block h-full">
                <div className="bg-white rounded-3xl shadow-sm border border-craft-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col">
                  <div className="relative h-72 overflow-hidden bg-craft-100">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-craft-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-white text-craft-900 font-bold py-3 px-6 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        View Passport
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">{product.category}</p>
                    <h3 className="text-xl font-bold text-craft-900 mb-4 leading-tight group-hover:text-accent transition-colors">{product.name}</h3>
                    
                    <div className="mt-auto">
                      <div className="w-full h-px bg-craft-100 mb-4"></div>
                      <div className="flex justify-between items-center">
                        <p className="text-2xl font-bold text-craft-900">NPR {product.price.toLocaleString()}</p>
                        <div className="text-right">
                          <p className="text-xs text-craft-500 font-medium uppercase tracking-wider">Artisan</p>
                          <p className="text-sm font-semibold text-craft-800 truncate max-w-[120px]" title={product.artisanName}>
                            {product.artisanName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center sm:hidden">
          <Link to="/marketplace">
            <Button className="w-full py-4 text-lg">Browse Full Marketplace</Button>
          </Link>
        </div>
      </section>

      {/* BOTTOM STORY BANNER */}
      <section className="bg-craft-900 rounded-3xl p-10 md:p-16 text-center shadow-xl relative overflow-hidden mt-12">
        <div className="relative z-20">
          <h2 className="text-3xl md:text-4xl font-bold text-craft-50 mb-6">Join the Movement</h2>
          <p className="text-craft-200 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
            Every purchase on CraftConnect directly supports a family, preserves a traditional skill, and helps build a sustainable local economy.
          </p>
          <Link to="/marketplace">
            <Button className="bg-accent hover:bg-white hover:text-accent border-none text-white px-8 py-3 text-lg shadow-lg">
              Start Exploring
            </Button>
          </Link>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-craft-50/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 z-10 pointer-events-none"></div>
      </section>

    </div>
  );
};

export default HomePage;
