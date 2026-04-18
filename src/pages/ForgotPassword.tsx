import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '@/lib/api';
import { Mail, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError('');

    try {
      const res = await apiRequest('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      if (res.success) {
        setIsSuccess(true);
      } else {
        setError(res.error || 'Failed to send reset link.');
      }
    } catch {
      setError('An unexpected error occurred.');
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

        {isSuccess ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Check Your Email</h1>
            <p className="text-white/40 text-sm max-w-sm mx-auto">
              We've sent a password reset link to <span className="text-white font-bold">{email}</span>. 
              Check your inbox and follow the instructions.
            </p>
            <div className="pt-6">
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
              >
                <ArrowLeft size={14} />
                BACK TO LOGIN
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white tracking-tight">Forgot Password?</h1>
            <p className="text-white/40 text-sm">Enter your email and we'll send you a reset link.</p>
          </>
        )}
      </div>

      {!isSuccess && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
              <input
                type="email"
                required
                className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-white/20 transition-all placeholder:text-white/20"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-3">
                <Loader2 size={20} className="animate-spin" />
                SENDING RESET LINK...
              </span>
            ) : (
              'SEND RESET LINK'
            )}
          </button>

          <div className="text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">
              <ArrowLeft size={14} />
              BACK TO LOGIN
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
