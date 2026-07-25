import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, MapPin, Briefcase, BookOpen, Lock, Image as ImageIcon, Camera, Video, FileText, CheckCircle, Eye, EyeOff } from 'lucide-react';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const RegisterArtisan = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    district: '', craftCategory: '', experience: '', bio: '',
    citizenshipDocument: '', profilePhoto: '', workshopPhoto: '', craftPhotos: [], video: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const uploadFileHandler = async (e, field, isArray = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
    setUploading(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('http://localhost:5000/api/upload/public', formDataUpload, config);
      
      if (isArray) {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], data.imageUrl] }));
      } else {
        setFormData(prev => ({ ...prev, [field]: data.imageUrl }));
      }
      toast.success('File uploaded');
    } catch (error) {
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      await axios.post(
        'http://localhost:5000/api/users',
        { ...formData, role: 'artisan' },
        config
      );
      setIsSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white p-10 rounded-3xl shadow-xl border border-craft-100 text-center animate-in fade-in zoom-in duration-700">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-craft-900 tracking-tight mb-4">Application Submitted</h2>
          <div className="inline-flex items-center bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full mb-6 text-yellow-800 font-bold tracking-wide">
            🟡 Pending Verification
          </div>
          <p className="text-craft-800 leading-relaxed mb-8">
            Our verification team will review your identity and submitted craftsmanship evidence. After the admin approves your application, you will be notified via phone or email. Once verified, you will receive the <strong>Verified Artisan</strong> badge and can begin selling products on our marketplace.
          </p>
          <Link to="/">
            <Button className="px-8 py-3">Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-craft-900 tracking-tight">Artisan Registration</h2>
        <p className="text-craft-500 mt-2">Join CraftConnect and sell directly to the world.</p>
      </div>

      <form onSubmit={submitHandler} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-craft-100 space-y-10">
        
        {/* SECTION 1 */}
        <div>
          <h3 className="text-xl font-bold text-craft-900 mb-6 border-b border-craft-100 pb-2">1. Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-craft-800">Full Name</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-craft-400" /></div>
                <input type="text" required name="name" value={formData.name} onChange={handleChange} className="focus:ring-accent focus:border-accent block w-full pl-10 pr-3 py-3 border-craft-200 rounded-xl bg-craft-50" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-craft-800">Email Address</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-craft-400" /></div>
                <input type="email" required name="email" value={formData.email} onChange={handleChange} className="focus:ring-accent focus:border-accent block w-full pl-10 pr-3 py-3 border-craft-200 rounded-xl bg-craft-50" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-craft-800">Phone Number</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-craft-400" /></div>
                <input type="tel" required name="phone" value={formData.phone} onChange={handleChange} className="focus:ring-accent focus:border-accent block w-full pl-10 pr-3 py-3 border-craft-200 rounded-xl bg-craft-50" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-craft-800">District</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin className="h-5 w-5 text-craft-400" /></div>
                <input type="text" required name="district" value={formData.district} onChange={handleChange} placeholder="e.g. Patan, Bhaktapur" className="focus:ring-accent focus:border-accent block w-full pl-10 pr-3 py-3 border-craft-200 rounded-xl bg-craft-50" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-craft-800">Craft Category</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Briefcase className="h-5 w-5 text-craft-400" /></div>
                <input type="text" required name="craftCategory" value={formData.craftCategory} onChange={handleChange} placeholder="e.g. Woodwork, Pottery" className="focus:ring-accent focus:border-accent block w-full pl-10 pr-3 py-3 border-craft-200 rounded-xl bg-craft-50" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-craft-800">Years of Experience</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><BookOpen className="h-5 w-5 text-craft-400" /></div>
                <input type="text" required name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 15 years" className="focus:ring-accent focus:border-accent block w-full pl-10 pr-3 py-3 border-craft-200 rounded-xl bg-craft-50" />
              </div>
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-sm font-medium text-craft-800">Short Biography</label>
              <textarea required name="bio" rows="3" value={formData.bio} onChange={handleChange} placeholder="Tell buyers your story..." className="focus:ring-accent focus:border-accent block w-full p-4 border-craft-200 rounded-xl bg-craft-50"></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 2 */}
        <div>
          <h3 className="text-xl font-bold text-craft-900 mb-6 border-b border-craft-100 pb-2">2. Identity Verification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-craft-50 p-6 rounded-xl border border-craft-200 text-center">
              <FileText className="w-8 h-8 text-craft-500 mx-auto mb-3" />
              <p className="text-sm font-bold text-craft-900 mb-2">Citizenship / National ID</p>
              <input type="file" onChange={(e) => uploadFileHandler(e, 'citizenshipDocument')} className="text-sm" accept="image/*" />
              {formData.citizenshipDocument && <p className="text-xs text-green-600 mt-2 font-bold">✓ Uploaded</p>}
            </div>
            <div className="bg-craft-50 p-6 rounded-xl border border-craft-200 text-center">
              <User className="w-8 h-8 text-craft-500 mx-auto mb-3" />
              <p className="text-sm font-bold text-craft-900 mb-2">Profile Photo</p>
              <input type="file" onChange={(e) => uploadFileHandler(e, 'profilePhoto')} className="text-sm" accept="image/*" />
              {formData.profilePhoto && <p className="text-xs text-green-600 mt-2 font-bold">✓ Uploaded</p>}
            </div>
          </div>
        </div>

        {/* SECTION 3 */}
        <div>
          <h3 className="text-xl font-bold text-craft-900 mb-6 border-b border-craft-100 pb-2">3. Craft Verification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-craft-50 p-6 rounded-xl border border-craft-200 text-center">
              <Camera className="w-8 h-8 text-craft-500 mx-auto mb-3" />
              <p className="text-sm font-bold text-craft-900 mb-2">Workshop Photo</p>
              <input type="file" onChange={(e) => uploadFileHandler(e, 'workshopPhoto')} className="text-sm" accept="image/*" />
              {formData.workshopPhoto && <p className="text-xs text-green-600 mt-2 font-bold">✓ Uploaded</p>}
            </div>
            <div className="bg-craft-50 p-6 rounded-xl border border-craft-200 text-center">
              <ImageIcon className="w-8 h-8 text-craft-500 mx-auto mb-3" />
              <p className="text-sm font-bold text-craft-900 mb-2">Crafting Process Photos</p>
              <input type="file" onChange={(e) => uploadFileHandler(e, 'craftPhotos', true)} className="text-sm" accept="image/*" />
              {formData.craftPhotos.length > 0 && <p className="text-xs text-green-600 mt-2 font-bold">✓ {formData.craftPhotos.length} Photo(s) Uploaded</p>}
            </div>
            <div className="md:col-span-2 bg-craft-50 p-6 rounded-xl border border-craft-200 text-center">
              <Video className="w-8 h-8 text-craft-500 mx-auto mb-3" />
              <p className="text-sm font-bold text-craft-900 mb-2">Process Video (Optional)</p>
              <input type="file" onChange={(e) => uploadFileHandler(e, 'video')} className="text-sm" accept="video/*" />
              {formData.video && <p className="text-xs text-green-600 mt-2 font-bold">✓ Uploaded</p>}
            </div>
          </div>
        </div>

        {/* SECTION 4 */}
        <div>
          <h3 className="text-xl font-bold text-craft-900 mb-6 border-b border-craft-100 pb-2">4. Security</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-craft-800">Password</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-craft-400" /></div>
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="focus:ring-accent focus:border-accent block w-full pl-10 pr-10 py-3 border-craft-200 rounded-xl bg-craft-50"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-craft-400 hover:text-craft-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-craft-800">Confirm Password</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-craft-400" /></div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="focus:ring-accent focus:border-accent block w-full pl-10 pr-10 py-3 border-craft-200 rounded-xl bg-craft-50"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-craft-400 hover:text-craft-600 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <Button type="submit" className="w-full py-4 text-lg shadow-md" disabled={loading || uploading}>
            {loading ? 'Submitting Application...' : (uploading ? 'Uploading Files...' : 'Submit Application & Create Account')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterArtisan;
