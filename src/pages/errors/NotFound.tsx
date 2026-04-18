import { Link } from 'react-router-dom';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-6 text-white">
      <div className="text-center space-y-8 animate-fade-in max-w-lg">
        {/* Glitch-style 404 */}
        <div className="relative">
          <h1 className="text-[10rem] font-black tracking-tighter text-white/[0.03] leading-none select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center">
              <AlertTriangle size={40} className="text-white/20" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-black uppercase tracking-tight">Signal Lost</h2>
          <p className="text-white/30 text-sm font-medium max-w-sm mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been relocated. Check the URL or navigate back to a known sector.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-white/40 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
          >
            <ArrowLeft size={14} />
            Go Back
          </button>
          <Link 
            to="/"
            className="px-8 py-3 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-xl shadow-white/5"
          >
            <Home size={14} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
