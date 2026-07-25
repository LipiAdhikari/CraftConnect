import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import { ShoppingCart, LogOut, User, Search, Heart, Menu, X, LayoutDashboard } from 'lucide-react';
import Footer from './Footer';

const MainLayout = () => {
  const { cartItems } = useCartStore();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setIsProfileDropdownOpen(false);
    navigate('/login');
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/marketplace?keyword=${keyword}`);
      setIsMobileMenuOpen(false);
    } else {
      navigate('/marketplace');
      setIsMobileMenuOpen(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-craft-50 text-craft-900">
      
      {(userInfo?.role === 'artisan' || userInfo?.role === 'admin') && (
        <div className="bg-accent text-white text-center py-1.5 text-xs font-bold tracking-widest uppercase">
          {userInfo?.role === 'admin' ? 'Super Admin Mode Active' : 'Artisan Mode Active'}
        </div>
      )}

      {/* Sticky Navbar */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-craft-100 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo & Desktop Links */}
            <div className="flex items-center space-x-8 relative z-50">
              <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer group">
                <span className="font-bold text-2xl text-accent tracking-tighter group-hover:text-craft-800 transition-colors">CraftConnect.</span>
              </Link>
              
              <nav className="hidden lg:flex space-x-6 text-sm font-medium text-craft-800">
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                <Link to="/marketplace" className="hover:text-accent transition-colors">Marketplace</Link>
                <Link to="/how-it-works" className="hover:text-accent transition-colors">How It Works</Link>
                <Link to="/about-us" className="hover:text-accent transition-colors">About Us</Link>
                <Link to="/contact-us" className="hover:text-accent transition-colors">Contact Us</Link>
              </nav>
            </div>
            
            {/* Search Bar (Center) */}
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <form onSubmit={submitSearch} className="relative group">
                <input
                  type="text"
                  placeholder="Search verified handmade goods..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-full border border-craft-200 bg-craft-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-inner"
                />
                <Search className="w-5 h-5 text-craft-400 group-focus-within:text-accent absolute left-4 top-3 transition-colors" />
              </form>
            </div>

            {/* Icons (Right) */}
            <div className="flex items-center space-x-4 md:space-x-6">
              
              <Link to="/" className="text-craft-800 hover:text-accent transition-colors hidden sm:block" title="Wishlist">
                <Heart className="w-6 h-6" />
              </Link>

              <Link to="/cart" className="relative text-craft-800 hover:text-accent transition-colors" title="Cart">
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white border-2 border-white">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </Link>

              {userInfo ? (
                <div className="relative hidden sm:block" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 text-sm font-medium text-craft-800 hover:text-accent focus:outline-none transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-craft-200 flex items-center justify-center text-craft-900 border border-craft-300">
                      {userInfo.name.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-craft-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2 border-b border-craft-100">
                        <p className="text-sm font-medium text-craft-900 truncate">{userInfo.name}</p>
                        <p className="text-xs text-craft-500 truncate">{userInfo.email}</p>
                      </div>
                      
                      {userInfo.role === 'artisan' && (
                        <Link 
                          to="/admin" 
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-craft-700 hover:bg-craft-50 hover:text-accent transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Artisan Dashboard
                        </Link>
                      )}
                      
                      {userInfo.role === 'admin' && (
                        <Link 
                          to="/admin-dashboard" 
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-craft-700 hover:bg-craft-50 hover:text-accent transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Super Admin
                        </Link>
                      )}

                      {userInfo.role === 'buyer' && (
                        <Link 
                          to="/dashboard" 
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-craft-700 hover:bg-craft-50 hover:text-accent transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Buyer Dashboard
                        </Link>
                      )}
                      
                      <button 
                        onClick={logoutHandler} 
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="hidden sm:flex items-center text-sm font-medium text-white bg-craft-900 hover:bg-craft-800 px-5 py-2 rounded-full shadow-sm transition-all hover:shadow">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden text-craft-800 hover:text-accent focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-craft-100 p-4 absolute w-full shadow-md animate-in slide-in-from-top-2">
            <form onSubmit={submitSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search artisans, products..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-craft-200 bg-craft-50 focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <Search className="w-5 h-5 text-craft-400 absolute left-3 top-2.5" />
            </form>
            <nav className="flex flex-col space-y-4 text-sm font-medium text-craft-800 p-2">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/marketplace" onClick={() => setIsMobileMenuOpen(false)}>Marketplace</Link>
              <Link to="/how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</Link>
              <Link to="/about-us" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              <Link to="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center"><Heart className="w-4 h-4 mr-2"/> Wishlist</Link>
              
              <div className="border-t border-craft-100 pt-4 mt-2">
                {userInfo ? (
                  <>
                    {userInfo.role === 'artisan' && (
                      <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-accent flex items-center mb-4">
                        <LayoutDashboard className="w-4 h-4 mr-2"/> Artisan Dashboard
                      </Link>
                    )}
                    {userInfo.role === 'admin' && (
                      <Link to="/admin-dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-accent flex items-center mb-4">
                        <LayoutDashboard className="w-4 h-4 mr-2"/> Super Admin
                      </Link>
                    )}
                    {userInfo.role === 'buyer' && (
                      <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-accent flex items-center mb-4">
                        <LayoutDashboard className="w-4 h-4 mr-2"/> Buyer Dashboard
                      </Link>
                    )}
                    <button onClick={logoutHandler} className="text-red-600 text-left flex items-center">
                      <LogOut className="w-4 h-4 mr-2"/> Sign out ({userInfo.name})
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-accent flex items-center">
                    <User className="w-4 h-4 mr-2"/> Sign In
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
