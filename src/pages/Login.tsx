import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    const BACKEND_URL = API_URL.includes('/api/v1') ? API_URL.replace('/api/v1', '') : API_URL;
    const GOOGLE_AUTH_URL = `${BACKEND_URL}/auth/google`;

    try {
      // Temporarily ping backend to ensure it is alive before redirect
      await fetch(GOOGLE_AUTH_URL, { method: 'HEAD', mode: 'no-cors' });
      window.location.href = GOOGLE_AUTH_URL;
    } catch (err) {
      toast.error('Google login unavailable');
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await login(formData);
      if (!res.success) {
        setError(res.error || 'Failed to login. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <Link to="/" className="inline-block mb-4">
           <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center font-black text-black text-xl mx-auto shadow-xl shadow-white/10">E</div>
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
        <p className="text-white/40 text-sm">Enter your credentials to access your LeadZen account.</p>
      </div>

      <div className="space-y-6">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading || isSubmitting}
          className={`w-full py-4 rounded-2xl bg-white text-black font-black text-lg transition-all shadow-xl shadow-white/5 hover:bg-white/90 active:scale-[0.98] flex items-center justify-center gap-3 ${
            isGoogleLoading || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isGoogleLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Redirecting...
            </>
          ) : (
            <>
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Or continue with email</span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-white/20 focus:ring-0 transition-all placeholder:text-white/20"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between pl-1">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Password</label>
                <Link to="/forgot-password" className="text-[10px] font-bold text-white/30 hover:text-white transition-colors">FORGOT?</Link>
              </div>
              <input
                type="password"
                required
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-white/20 focus:ring-0 transition-all placeholder:text-white/20"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 rounded-2xl bg-white text-black font-black text-lg transition-all shadow-xl shadow-white/5 hover:bg-white/90 active:scale-[0.98] ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'SECURELY LOGGING IN...' : 'CONTINUE TO DASHBOARD'}
          </button>
        </form>
      </div>

      <div className="text-center">
        <p className="text-white/30 text-xs">
          DON'T HAVE AN ACCOUNT?{' '}
          <Link to="/signup" className="text-white font-bold hover:underline underline-offset-4">SIGN UP FOR FREE</Link>
        </p>
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-zinc-400 hover:text-white transition duration-200 inline-flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
