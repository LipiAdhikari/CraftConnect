import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ScrollToTop from './components/utils/ScrollToTop';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import HomePage from './pages/shop/HomePage';
import Marketplace from './pages/shop/Marketplace';
import HowItWorks from './pages/shop/HowItWorks';
import AboutUs from './pages/shop/AboutUs';
import ContactUs from './pages/shop/ContactUs';
import ProductDetail from './pages/shop/ProductDetail';
import CartPage from './pages/shop/CartPage';
import Checkout from './pages/shop/Checkout';
import PaymentSuccess from './pages/shop/PaymentSuccess';
import PaymentFailed from './pages/shop/PaymentFailed';
import Login from './pages/shop/Login';
import Register from './pages/shop/Register';
import RegisterBuyer from './pages/shop/RegisterBuyer';
import RegisterArtisan from './pages/shop/RegisterArtisan';
import Dashboard from './pages/admin/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductList from './pages/admin/ProductList';
import ProductEdit from './pages/admin/ProductEdit';
import BuyerDashboard from './pages/shop/BuyerDashboard';
import NotFound from './pages/error/NotFound';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes with MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment/success/:id" element={<PaymentSuccess />} />
            <Route path="payment/failed" element={<PaymentFailed />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="register/buyer" element={<RegisterBuyer />} />
            <Route path="register/artisan" element={<RegisterArtisan />} />
            <Route path="dashboard" element={<BuyerDashboard />} />
          </Route>

          {/* Artisan Dashboard Routes with AdminLayout wrapper */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/:id/edit" element={<ProductEdit />} />
          </Route>

          {/* Super Admin Dashboard Route */}
          <Route path="/admin-dashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<MainLayout />}>
             <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
