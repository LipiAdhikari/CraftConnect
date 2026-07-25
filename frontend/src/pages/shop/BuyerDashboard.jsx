import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Flag, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const BuyerDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/reports/myreports', config);
        setReports(data);
      } catch (error) {
        toast.error('Failed to load reports');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [userInfo.token]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending Review': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'Under Investigation': return <AlertCircle className="w-5 h-5 text-accent" />;
      case 'Resolved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Rejected': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-craft-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pending Review': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Under Investigation': return 'bg-accent/10 text-accent border-accent/20';
      case 'Resolved': return 'bg-green-50 text-green-700 border-green-200';
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-craft-50 text-craft-700 border-craft-200';
    }
  };

  if (loading) return <div className="text-center py-20">Loading your dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-craft-900 tracking-tight">Buyer Dashboard</h1>
        <p className="text-craft-600 mt-2">Welcome back, {userInfo.name}. Manage your account and reports here.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-craft-100 p-8 mb-8 animate-in fade-in slide-in-from-bottom-4">
        <h2 className="text-2xl font-bold text-craft-900 mb-6 flex items-center">
          <Flag className="w-6 h-6 mr-3 text-red-500" /> My Authenticity Reports
        </h2>

        {reports.length === 0 ? (
          <div className="text-center py-12 bg-craft-50 rounded-2xl border border-craft-100">
            <Flag className="w-12 h-12 text-craft-300 mx-auto mb-3" />
            <p className="text-craft-800 font-medium text-lg">You haven't submitted any reports yet.</p>
            <p className="text-sm text-craft-500 mt-2">Thank you for keeping our marketplace safe.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div key={report._id} className="border border-craft-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                {report.product && (
                  <div className="h-40 overflow-hidden relative">
                    <img src={report.product.imageUrl} alt={report.product.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Link to={`/product/${report.product._id}`} className="absolute bottom-3 left-3 text-white font-bold hover:underline truncate w-11/12">
                      {report.product.name}
                    </Link>
                  </div>
                )}
                <div className="p-5 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(report.status)}`}>
                      {getStatusIcon(report.status)}
                      <span className="ml-1.5">{report.status}</span>
                    </span>
                    <span className="text-xs text-craft-500 font-medium">{new Date(report.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-craft-500 mb-1">Reason</p>
                    <p className="text-sm font-semibold text-craft-900">{report.reason}</p>
                  </div>
                  
                  {report.description && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-craft-500 mb-1">Details</p>
                      <p className="text-sm text-craft-700 italic line-clamp-2">"{report.description}"</p>
                    </div>
                  )}

                  {report.adminNotes && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1">Admin Response</p>
                      <p className="text-sm text-blue-900">{report.adminNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
