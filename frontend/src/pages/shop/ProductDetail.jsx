import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'react-qr-code';
import useCartStore from '../../store/cartStore';
import Button from '../../components/ui/Button';
import { ShieldCheck, MapPin, User as UserIcon, Flag, AlertTriangle, X, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const REPORT_REASONS = [
  'Looks machine-made instead of handmade',
  'Product received is different from the listing',
  'Misleading description',
  'Fake artisan information',
  'Poor quality / damaged item',
  'Suspected counterfeit',
  'Other'
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  // User and Reporting State
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
  const isBuyer = userInfo?.role === 'buyer';
  
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [evidenceImages, setEvidenceImages] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submittingReport, setSubmittingReport] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      product: product._id,
      name: product.name,
      imageUrl: product.imageUrl,
      priceAtPurchase: product.price,
      quantity: 1,
    });
    toast.success('Added to cart');
  };

  const handleImageUpload = async (e) => {
    if (evidenceImages.length >= 3) {
      toast.error('Maximum 3 images allowed');
      return;
    }
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploadingImage(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('http://localhost:5000/api/upload/public', formData, config);
      setEvidenceImages([...evidenceImages, data.imageUrl]);
      toast.success('Image uploaded');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const submitReportHandler = async (e) => {
    e.preventDefault();
    if (!reportReason) {
      toast.error('Please select a reason');
      return;
    }
    if (reportReason === 'Other' && !reportDescription.trim()) {
      toast.error('Please provide a description');
      return;
    }

    setSubmittingReport(true);
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.post(
        'http://localhost:5000/api/reports',
        {
          productId: product._id,
          reason: reportReason,
          description: reportDescription,
          evidenceImages,
        },
        config
      );
      setReportSuccess(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit report');
    } finally {
      setSubmittingReport(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  const total = product.priceBreakdown.artisanCut + product.priceBreakdown.materialsCost + product.priceBreakdown.platformFee;
  const artisanPct = (product.priceBreakdown.artisanCut / total) * 100;
  const materialsPct = (product.priceBreakdown.materialsCost / total) * 100;
  const platformPct = (product.priceBreakdown.platformFee / total) * 100;

  return (
    <div className="animate-in fade-in duration-500">
      <Link to="/" className="text-accent hover:underline mb-6 inline-block">&larr; Back to Shop</Link>
      
      {product.isUnderReview && (
        <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-xl p-6 flex items-start shadow-sm animate-in zoom-in-95">
          <AlertTriangle className="w-8 h-8 text-red-600 mr-4 shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-red-800 mb-1">⚠ Under Authenticity Review</h3>
            <p className="text-red-700 font-medium">This product has been flagged by multiple buyers and is currently under investigation by our moderation team. Purchasing has been temporarily disabled to protect our community.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className={`w-full rounded-xl shadow-lg object-cover h-96 ${product.isUnderReview ? 'grayscale opacity-70' : ''}`}
          />
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-craft-100">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              Transparent Pricing <span className="ml-2 text-sm font-normal text-craft-800 bg-craft-100 px-2 py-1 rounded-full">Total: NPR {product.price.toLocaleString()}</span>
            </h3>
            <div className="flex h-4 rounded-full overflow-hidden mb-4">
              <div style={{ width: `${artisanPct}%` }} className="bg-accent transition-all duration-1000" title="Artisan Cut"></div>
              <div style={{ width: `${materialsPct}%` }} className="bg-craft-800 transition-all duration-1000" title="Materials"></div>
              <div style={{ width: `${platformPct}%` }} className="bg-craft-100 transition-all duration-1000" title="Platform Fee"></div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between items-center">
                <span className="flex items-center"><div className="w-3 h-3 bg-accent rounded-full mr-2"></div> Artisan Cut</span>
                <span className="font-medium">NPR {product.priceBreakdown.artisanCut.toLocaleString()} ({artisanPct.toFixed(0)}%)</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="flex items-center"><div className="w-3 h-3 bg-craft-800 rounded-full mr-2"></div> Materials</span>
                <span className="font-medium">NPR {product.priceBreakdown.materialsCost.toLocaleString()} ({materialsPct.toFixed(0)}%)</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="flex items-center"><div className="w-3 h-3 bg-craft-100 border border-craft-800 rounded-full mr-2"></div> Platform Fee</span>
                <span className="font-medium">NPR {product.priceBreakdown.platformFee.toLocaleString()} ({platformPct.toFixed(0)}%)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 tracking-tight">{product.name}</h1>
            <p className="text-2xl font-light text-accent">NPR {product.price.toLocaleString()}</p>
          </div>
          
          <p className="text-craft-800 leading-relaxed">{product.description}</p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            {product.isUnderReview ? (
              <Button disabled className="w-full py-3 text-lg bg-red-200 text-red-800 border-none">
                Purchasing Disabled
              </Button>
            ) : (
              <Button onClick={handleAddToCart} disabled={!product.inStock} className="w-full py-3 text-lg shadow-md hover:shadow-lg">
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            )}

            {isBuyer && !product.isUnderReview && (
              <Button 
                onClick={() => setIsReportModalOpen(true)} 
                variant="outline" 
                className="py-3 px-6 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 whitespace-nowrap"
              >
                <Flag className="w-4 h-4 mr-2 inline" /> Report Product
              </Button>
            )}
          </div>

          <div className="mt-8 bg-craft-100 p-6 rounded-xl border border-craft-200 shadow-inner relative overflow-hidden">
            <div className="flex items-center mb-4 text-craft-900">
              <ShieldCheck className="w-6 h-6 mr-2 text-accent" />
              <h3 className="text-xl font-bold">Authenticity Passport</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
              <div className="bg-white p-2 rounded-lg shadow-sm flex-shrink-0 mx-auto sm:mx-0">
                <QRCode value={window.location.href} size={120} level="H" />
                <p className="text-[10px] text-center mt-1 text-craft-800 font-mono">Scan to Verify</p>
              </div>
              
              <div className="space-y-3 flex-1">
                <div className="flex items-start">
                  <UserIcon className="w-5 h-5 mr-2 mt-0.5 text-craft-800 shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase text-craft-800 tracking-wider">Maker</p>
                    <p className="font-medium">{product.artisanName}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 mt-0.5 text-craft-800 shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase text-craft-800 tracking-wider">Origin</p>
                    <p className="font-medium">{product.artisanLocation}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-craft-800 tracking-wider mb-1">Story</p>
                  <p className="text-sm italic text-craft-800">"{product.artisanStory}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REPORT MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
            
            <div className="px-6 py-4 border-b border-craft-100 flex justify-between items-center bg-craft-50">
              <h2 className="text-xl font-bold text-craft-900 flex items-center">
                <Flag className="w-5 h-5 text-red-500 mr-2" /> Report Suspicious Product
              </h2>
              <button onClick={() => { setIsReportModalOpen(false); setReportSuccess(false); }} className="text-craft-400 hover:text-craft-900 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {reportSuccess ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-craft-900 mb-2">✅ Thank you for helping us maintain trust.</h3>
                  <p className="text-craft-800 mb-6">Your report has been submitted successfully.</p>
                  <p className="text-sm text-craft-600 max-w-md mx-auto">
                    Our verification team will carefully review the product. If necessary, we will contact the artisan or temporarily investigate the listing.
                  </p>
                  <Button onClick={() => { setIsReportModalOpen(false); setReportSuccess(false); }} className="mt-8 px-8">Close</Button>
                </div>
              ) : (
                <form onSubmit={submitReportHandler}>
                  <p className="text-craft-600 mb-6">Help us maintain an authentic marketplace by reporting products that may violate our authenticity guidelines.</p>
                  
                  <div className="space-y-3 mb-6">
                    {REPORT_REASONS.map(reason => (
                      <label key={reason} className={`flex items-center p-3 rounded-xl border cursor-pointer transition-colors ${reportReason === reason ? 'border-accent bg-accent/5' : 'border-craft-200 hover:bg-craft-50'}`}>
                        <input type="radio" name="reportReason" value={reason} checked={reportReason === reason} onChange={(e) => setReportReason(e.target.value)} className="w-4 h-4 text-accent border-craft-300 focus:ring-accent" />
                        <span className="ml-3 text-craft-900 font-medium">{reason}</span>
                      </label>
                    ))}
                  </div>

                  {reportReason === 'Other' && (
                    <div className="mb-6 animate-in fade-in slide-in-from-top-2">
                      <textarea 
                        rows="3" 
                        value={reportDescription}
                        onChange={(e) => setReportDescription(e.target.value)}
                        placeholder="Please describe your concern..." 
                        className="w-full p-3 border border-craft-200 rounded-xl focus:ring-accent focus:border-accent resize-none bg-craft-50"
                        required
                      ></textarea>
                    </div>
                  )}

                  <div className="mb-8">
                    <p className="text-sm font-bold text-craft-900 mb-2">Evidence Images (Optional, max 3)</p>
                    <div className="flex gap-4">
                      {evidenceImages.map((img, idx) => (
                        <div key={idx} className="w-20 h-20 rounded-lg border border-craft-200 overflow-hidden relative group">
                          <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => setEvidenceImages(evidenceImages.filter((_, i) => i !== idx))} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      {evidenceImages.length < 3 && (
                        <label className="w-20 h-20 rounded-lg border-2 border-dashed border-craft-300 flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors text-craft-500 hover:text-accent">
                          <Camera className="w-6 h-6 mb-1" />
                          <span className="text-[10px] font-medium">Upload</span>
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                        </label>
                      )}
                    </div>
                    {uploadingImage && <p className="text-xs text-accent mt-2 animate-pulse">Uploading image...</p>}
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-craft-100">
                    <Button type="button" variant="outline" onClick={() => setIsReportModalOpen(false)}>Cancel</Button>
                    <Button type="submit" className="bg-red-600 hover:bg-red-700 hover:text-white border-transparent" disabled={submittingReport || uploadingImage}>
                      {submittingReport ? 'Submitting...' : 'Submit Report'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetail;
