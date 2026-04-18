import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6 selection:bg-red-500/30">
      <div className="max-w-md w-full text-center space-y-12 animate-fade-in">
        {/* Animated Shield Icon */}
        <div className="relative inline-block group">
           <div className="absolute inset-0 bg-red-500/20 blur-[64px] rounded-full group-hover:bg-red-500/30 transition-all duration-500" />
           <div className="relative w-32 h-32 rounded-[3.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
              <ShieldAlert size={64} strokeWidth={1.5} />
           </div>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-center gap-3 text-red-500 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60">Security Clearance Required</span>
           </div>
           <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Access Denied</h1>
           <p className="text-white/40 text-sm font-medium uppercase tracking-widest leading-relaxed">
             Error 403: Forbidden Identity Integrity Failure. 
             Your current security token lacks the necessary privileges for this sector.
           </p>
        </div>

        <div className="flex flex-col gap-4 pt-8">
           <button 
             onClick={() => navigate(-1)}
             className="px-8 py-5 rounded-[2rem] bg-white text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-emerald-400 transition-all shadow-2xl shadow-white/5 flex items-center justify-center gap-3 group active:scale-95"
           >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Retreat to Safety
           </button>
           <button 
             onClick={() => navigate('/')}
             className="px-8 py-5 rounded-[2rem] bg-white/5 border border-white/5 text-white/40 font-black text-xs uppercase tracking-[0.3em] hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-95"
           >
              <Home size={16} />
              Platform Hub
           </button>
        </div>

        <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.4em] pt-12">
          Global Security Node 0-X | Response ID: ACCESS_VIOLATION_403
        </p>
      </div>
    </div>
  );
}
