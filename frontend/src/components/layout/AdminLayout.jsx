import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, LayoutDashboard, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  if (!userInfo || userInfo.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-craft-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-craft-800 mb-6">You do not have permission to view this page.</p>
          <Link to="/" className="text-accent hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-craft-50 font-sans text-craft-900">
      {/* Sidebar */}
      <aside className="w-64 bg-craft-900 text-craft-50 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-craft-800">
          <Link to="/" className="cursor-pointer group">
            <span className="font-bold text-xl text-accent group-hover:text-white transition-colors">CraftConnect.</span>
          </Link>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link to="/admin" className="flex items-center space-x-3 hover:bg-craft-800 px-4 py-3 rounded-lg transition-colors">
            <LayoutDashboard className="w-5 h-5 text-accent" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/products" className="flex items-center space-x-3 hover:bg-craft-800 px-4 py-3 rounded-lg transition-colors">
            <Package className="w-5 h-5 text-craft-100" />
            <span>Products</span>
          </Link>
          <Link to="/admin/orders" className="flex items-center space-x-3 hover:bg-craft-800 px-4 py-3 rounded-lg transition-colors">
            <ShoppingBag className="w-5 h-5 text-craft-100" />
            <span>Orders</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-craft-800">
          <button onClick={logoutHandler} className="flex items-center space-x-3 hover:text-accent w-full px-4 py-2 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 animate-in fade-in bg-craft-50">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, {userInfo.name}</h1>
          <Link to="/" className="text-sm font-medium text-craft-800 hover:text-accent border border-craft-200 px-4 py-2 rounded-md bg-white">
            View Live Site
          </Link>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
