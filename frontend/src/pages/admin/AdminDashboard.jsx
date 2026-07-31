import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, MapPin, Briefcase, BookOpen, Check, X, Eye, Flag, AlertCircle, ShieldCheck } from 'lucide-react';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('verifications');
  
  const [pendingArtisans, setPendingArtisans] = useState([]);
  const [loadingArtisans, setLoadingArtisans] = useState(true);
  
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);

  useEffect(() => {
    fetchPendingArtisans();
    fetchReports();
  }, []);

  const fetchPendingArtisans = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get('/api/users/artisans/pending', config);
      setPendingArtisans(data);
    } catch (error) {
      toast.error('Failed to load pending verifications');
    } finally {
      setLoadingArtisans(false);
    }
  };

  const verifyArtisan = async (id, status) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`/api/users/${id}/verify`, { status }, config);
      toast.success(`Artisan ${status === 'verified' ? 'Approved' : 'Rejected'} successfully`);
      fetchPendingArtisans();
    } catch (error) {
      toast.error('Failed to verify artisan');
    }
  };

  const fetchReports = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get('/api/reports', config);
      setReports(data);
    } catch (error) {
      toast.error('Failed to load reports');
    } finally {
      setLoadingReports(false);
    }
  };

  const updateReportStatus = async (reportId, status, hideProduct) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`/api/reports/${reportId}`, { status, hideProduct }, config);
      toast.success(`Report marked as ${status}`);
      fetchReports();
    } catch (error) {
      toast.error('Failed to update report status');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-craft-900 tracking-tight">Super Admin Dashboard</h1>
        <p className="text-craft-600 mt-2">Manage pending artisan verifications and authenticity reports.</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setActiveTab('verifications')}
          className={`px-6 py-3 rounded-full font-bold text-sm transition-colors ${activeTab === 'verifications' ? 'bg-craft-900 text-white' : 'bg-craft-200 text-craft-700 hover:bg-craft-300'}`}
        >
          Pending Verifications
        </button>
        <button 
          onClick={() => setActiveTab('reports')}
          className={`px-6 py-3 rounded-full font-bold text-sm transition-colors flex items-center ${activeTab === 'reports' ? 'bg-red-600 text-white' : 'bg-craft-200 text-craft-700 hover:bg-craft-300'}`}
        >
          Product Reports {reports.filter(r => r.status === 'Pending Review').length > 0 && <span className="ml-2 w-5 h-5 bg-white text-red-600 rounded-full flex items-center justify-center text-xs">{reports.filter(r => r.status === 'Pending Review').length}</span>}
        </button>
      </div>

      {activeTab === 'verifications' && (
        <div className="bg-white rounded-3xl shadow-sm border border-craft-100 p-8 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-xl font-bold text-craft-900 mb-6 flex items-center">
            <span className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></span>
            Pending Verifications ({pendingArtisans.length})
          </h2>

          {loadingArtisans ? (
            <div className="text-center py-12">Loading...</div>
          ) : pendingArtisans.length === 0 ? (
            <div className="text-center py-12 bg-craft-50 rounded-2xl border border-craft-100">
              <p className="text-craft-800 font-medium text-lg">No pending applications.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {pendingArtisans.map((artisan) => (
                <div key={artisan._id} className="border border-craft-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6 md:p-8">
                    {/* Top Header */}
                    <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                      <img 
                        src={artisan.profilePhoto || 'https://via.placeholder.com/150'} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full object-cover border-4 border-craft-100 shadow-sm"
                      />
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-craft-900 mb-2">{artisan.name}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-craft-800">
                          <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-accent" /> {artisan.district}</span>
                          <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1 text-accent" /> {artisan.craftCategory}</span>
                          <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1 text-accent" /> {artisan.experience}</span>
                        </div>
                        <p className="mt-4 text-craft-700 leading-relaxed bg-craft-50 p-4 rounded-xl italic">"{artisan.bio}"</p>
                      </div>
                    </div>

                    {/* Documents Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div>
                        <p className="font-semibold text-craft-900 mb-2 text-sm uppercase tracking-wider">Citizenship Document</p>
                        {artisan.citizenshipDocument ? (
                          <a href={artisan.citizenshipDocument} target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden rounded-xl border border-craft-200">
                            <img src={artisan.citizenshipDocument} alt="Citizenship" className="w-full h-40 object-cover" />
                            <div className="absolute inset-0 bg-craft-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white flex items-center bg-black/50 px-4 py-2 rounded-full"><Eye className="w-4 h-4 mr-2" /> View Full</span>
                            </div>
                          </a>
                        ) : <p className="text-craft-500 text-sm">Not provided</p>}
                      </div>
                      
                      <div>
                        <p className="font-semibold text-craft-900 mb-2 text-sm uppercase tracking-wider">Workshop Photo</p>
                        {artisan.workshopPhoto ? (
                          <a href={artisan.workshopPhoto} target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden rounded-xl border border-craft-200">
                            <img src={artisan.workshopPhoto} alt="Workshop" className="w-full h-40 object-cover" />
                            <div className="absolute inset-0 bg-craft-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white flex items-center bg-black/50 px-4 py-2 rounded-full"><Eye className="w-4 h-4 mr-2" /> View Full</span>
                            </div>
                          </a>
                        ) : <p className="text-craft-500 text-sm">Not provided</p>}
                      </div>

                      <div>
                        <p className="font-semibold text-craft-900 mb-2 text-sm uppercase tracking-wider">Process Evidence</p>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {artisan.craftPhotos && artisan.craftPhotos.map((photo, idx) => (
                            <a key={idx} href={photo} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 relative group overflow-hidden rounded-xl border border-craft-200 w-24 h-24">
                              <img src={photo} alt="Craft Process" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-craft-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Eye className="w-5 h-5 text-white" />
                              </div>
                            </a>
                          ))}
                        </div>
                        {artisan.video && (
                          <div className="mt-2">
                            <a href={artisan.video} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm font-medium">
                              ▶ View Process Video
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-6 border-t border-craft-100">
                      <Button onClick={() => verifyArtisan(artisan._id, 'verified')} className="bg-green-600 hover:bg-green-700 flex-1 py-3 text-lg font-bold shadow-md">
                        <Check className="w-5 h-5 mr-2 inline" /> Approve Artisan
                      </Button>
                      <Button onClick={() => verifyArtisan(artisan._id, 'rejected')} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 flex-1 py-3 text-lg font-bold">
                        <X className="w-5 h-5 mr-2 inline" /> Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl shadow-sm border border-craft-100 p-8 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-xl font-bold text-craft-900 mb-6 flex items-center">
            <Flag className="w-6 h-6 mr-3 text-red-500" />
            Product Authenticity Reports ({reports.length})
          </h2>

          {loadingReports ? (
            <div className="text-center py-12">Loading...</div>
          ) : reports.length === 0 ? (
            <div className="text-center py-12 bg-craft-50 rounded-2xl border border-craft-100">
              <p className="text-craft-800 font-medium text-lg">No product reports.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reports.map((report) => (
                <div key={report._id} className="border border-craft-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col md:flex-row">
                  {report.product && (
                    <div className="w-full md:w-64 h-48 md:h-auto bg-craft-50 relative flex-shrink-0">
                      <img src={report.product.imageUrl} alt={report.product.name} className={`w-full h-full object-cover ${report.product.isUnderReview ? 'grayscale' : ''}`} />
                      {report.product.isUnderReview && (
                        <div className="absolute inset-0 bg-red-900/40 flex items-center justify-center">
                          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" /> HIDDEN
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-craft-900 mb-1">{report.product ? report.product.name : 'Unknown Product'}</h3>
                        <p className="text-sm text-craft-600">Artisan: {report.product?.artisanName} | Reported by: {report.buyer?.name} ({report.buyer?.email})</p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        report.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                        report.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {report.status}
                      </span>
                    </div>

                    <div className="bg-red-50 p-4 rounded-xl mb-4 border border-red-100">
                      <p className="text-xs font-bold text-red-800 uppercase tracking-wider mb-1">Reason: {report.reason}</p>
                      {report.description && <p className="text-sm text-red-900 italic">"{report.description}"</p>}
                    </div>

                    {report.evidenceImages && report.evidenceImages.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-bold text-craft-700 uppercase tracking-wider mb-2">Evidence Images</p>
                        <div className="flex gap-2">
                          {report.evidenceImages.map((img, idx) => (
                            <a key={idx} href={img} target="_blank" rel="noopener noreferrer" className="block w-16 h-16 rounded-lg overflow-hidden border border-craft-200">
                              <img src={img} alt="Evidence" className="w-full h-full object-cover hover:scale-110 transition-transform" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4 border-t border-craft-100 flex-wrap">
                      {report.status !== 'Resolved' && (
                        <Button 
                          onClick={() => updateReportStatus(report._id, 'Resolved', false)} 
                          className="bg-green-600 hover:bg-green-700 py-2"
                        >
                          <ShieldCheck className="w-4 h-4 mr-2 inline" /> Mark as Genuine
                        </Button>
                      )}
                      
                      {report.product && !report.product.isUnderReview && (
                        <Button 
                          onClick={() => updateReportStatus(report._id, 'Under Investigation', true)} 
                          variant="outline" 
                          className="border-red-200 text-red-600 hover:bg-red-50 py-2"
                        >
                          <AlertCircle className="w-4 h-4 mr-2 inline" /> Hide Product
                        </Button>
                      )}
                      
                      {report.status !== 'Rejected' && (
                        <Button 
                          onClick={() => updateReportStatus(report._id, 'Rejected', report.product?.isUnderReview ? false : undefined)} 
                          variant="outline" 
                          className="py-2"
                        >
                          <X className="w-4 h-4 mr-2 inline" /> Reject Report
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
