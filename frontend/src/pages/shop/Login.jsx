import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get('redirect');

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      handleRedirect(JSON.parse(userInfo));
    }
  }, [navigate]);

  const handleRedirect = (user) => {
    if (redirect) {
      navigate(redirect);
    } else if (user.role === 'admin') {
      navigate('/admin-dashboard');
    } else if (user.role === 'artisan') {
      navigate('/admin'); // Artisan dashboard
    } else {
      navigate('/'); // Buyer dashboard / home
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post(
        'http://localhost:5000/api/users/login',
        { email, password },
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Logged in successfully');
      handleRedirect(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-craft-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-craft-900 tracking-tight">Welcome Back</h2>
          <p className="text-craft-500 mt-2">Sign in to your CraftConnect account</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-craft-800 mb-1">Email Address</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-craft-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:ring-accent focus:border-accent block w-full pl-10 pr-3 py-3 sm:text-sm border-craft-200 rounded-xl bg-craft-50"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-craft-800 mb-1">Password</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-craft-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-accent focus:border-accent block w-full pl-10 pr-10 py-3 sm:text-sm border-craft-200 rounded-xl bg-craft-50"
                placeholder="••••••••"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-accent focus:ring-accent border-craft-300 rounded text-accent"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-craft-800">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-accent hover:text-accent-hover transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          <Button type="submit" className="w-full py-3.5 text-lg shadow-md" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-craft-600">
            Don't have an account?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="font-medium text-accent hover:text-accent-hover transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
