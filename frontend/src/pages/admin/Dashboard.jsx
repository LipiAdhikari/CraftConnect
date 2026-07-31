import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalSales: 0, totalOrders: 0, totalProducts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('/api/orders/stats', config);
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading statistics...</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-craft-100">
          <h3 className="text-craft-800 text-sm font-medium uppercase tracking-wider mb-2">Total Sales</h3>
          <p className="text-3xl font-bold text-accent">NPR {stats.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-craft-100">
          <h3 className="text-craft-800 text-sm font-medium uppercase tracking-wider mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-craft-900">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-craft-100">
          <h3 className="text-craft-800 text-sm font-medium uppercase tracking-wider mb-2">Active Products</h3>
          <p className="text-3xl font-bold text-craft-900">{stats.totalProducts}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-craft-100 p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <p className="text-craft-800 italic">No recent activity to display.</p>
      </div>
    </>
  );
};

export default Dashboard;
