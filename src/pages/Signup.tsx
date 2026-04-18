import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { ArrowLeft } from 'lucide-react';

export default function Signup() {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await signup(formData);
      if (!res.success) {
        setError(res.error || 'Failed to create account.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
        <p className="text-white/40 text-sm">Join the Euonex ecosystem and start managing leads in minutes.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
           <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-white/20 transition-all placeholder:text-white/20"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-white/20 transition-all placeholder:text-white/20"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-white/20 transition-all placeholder:text-white/20"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Confirm Password</label>
            <input
              type="password"
              required
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-white/20 transition-all placeholder:text-white/20"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
          {isSubmitting ? 'CREATING ACCOUNT...' : 'GET STARTED NOW'}
        </button>
      </form>

      <div className="text-center">
        <p className="text-white/30 text-xs">
          ALREADY HAVE AN ACCOUNT?{' '}
          <Link to="/login" className="text-white font-bold hover:underline underline-offset-4">LOGIN HERE</Link>
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
