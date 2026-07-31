import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Star, ShieldCheck, ShoppingCart, User } from 'lucide-react';
import Button from '../../components/ui/Button';
import useCartStore from '../../store/cartStore';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const searchKeyword = new URLSearchParams(location.search).get('keyword') || '';
    setKeyword(searchKeyword);
  }, [location.search]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest'); // newest, price_low, price_high, rating

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = `/api/products${keyword ? `?keyword=${keyword}` : ''}${category ? (keyword ? `&category=${category}` : `?category=${category}`) : ''}`;
      const { data } = await axios.get(url);
      
      let sortedData = [...data];
      if (sort === 'price_low') sortedData.sort((a, b) => a.price - b.price);
      if (sort === 'price_high') sortedData.sort((a, b) => b.price - a.price);
      if (sort === 'rating') sortedData.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      
      setProducts(sortedData);
    } catch (error) {
      console.error('Error fetching products', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, sort, keyword]);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/marketplace?keyword=${keyword}`);
    fetchProducts();
  };

  const categories = ['All', 'Textile', 'Pottery', 'Wood Craft', 'Traditional Art', 'Bamboo Craft', 'Jewelry', 'Felt Craft'];

  const handleAddToCart = (product) => {
    addToCart({
      product: product._id,
      name: product.name,
      imageUrl: product.imageUrl,
      priceAtPurchase: product.price,
      quantity: 1,
    });
    navigate('/cart');
  };

  return (
    <div className="py-8">
      {/* HEADER SECTION */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-craft-100 mb-10 text-center animate-in fade-in slide-in-from-top-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-craft-900 mb-4 tracking-tight">Marketplace</h1>
        <p className="text-lg text-craft-800 max-w-2xl mx-auto mb-10">
          Discover authentic handmade crafts directly from verified Nepali artisans.
        </p>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
          <form onSubmit={submitSearch} className="relative w-full md:flex-1">
            <input
              type="text"
              placeholder="Search authentic crafts..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-craft-200 bg-craft-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-inner"
            />
            <Search className="w-5 h-5 text-craft-400 absolute left-4 top-3.5" />
          </form>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value === 'All' ? '' : e.target.value)}
              className="px-4 py-3 rounded-full border border-craft-200 bg-craft-50 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm flex-1 md:w-48 appearance-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-3 rounded-full border border-craft-200 bg-craft-50 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm flex-1 md:w-48 appearance-none"
            >
              <option value="newest">Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      {loading ? (
        <div className="text-center py-20 animate-pulse">
          <div className="w-12 h-12 border-4 border-craft-200 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-craft-800 font-medium">Loading artisans...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-craft-100">
          <p className="text-lg text-craft-800 font-medium">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-3xl shadow-sm border border-craft-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group">
              {/* Image & Badges */}
              <div className="relative h-64 overflow-hidden bg-craft-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-craft-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                  {product.rating || 'New'}
                </div>
                <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                  {product.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-craft-900 mb-3 truncate">{product.name}</h3>
                
                <div className="flex flex-col space-y-2 text-sm text-craft-800 mb-5">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-craft-500" />
                    <span className="truncate">{product.artisanName}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-craft-500" />
                    <span>{product.artisanLocation}</span>
                  </div>
                </div>

                <div className="flex items-center bg-green-50 text-green-700 px-3 py-1.5 rounded-md w-max mb-6">
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Verified Artisan</span>
                </div>

                <div className="mt-auto">
                  <p className="text-2xl font-bold text-craft-900 mb-4">NPR {product.price.toLocaleString()}</p>
                  
                  <div className="flex flex-col space-y-3">
                    <Link to={`/product/${product._id}`} className="w-full">
                      <Button variant="outline" className="w-full justify-center">
                        View Craft Passport
                      </Button>
                    </Link>
                    <Button 
                      className="w-full justify-center" 
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
