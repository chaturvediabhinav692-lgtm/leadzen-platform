import { AlertCircle, RefreshCw } from 'lucide-react';

interface BackendUnavailableProps {
  onRetry?: () => void;
  message?: string;
}

export function BackendUnavailable({ onRetry, message = "System connection interrupted. Check Node Status." }: BackendUnavailableProps) {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center space-y-8 animate-fade-in">
      <div className="w-20 h-20 rounded-[2.5rem] bg-red-500/10 flex items-center justify-center text-red-500 shadow-2xl shadow-red-500/20">
        <AlertCircle size={40} />
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Backend Node Offline</h2>
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{message}</p>
      </div>

      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-8 py-3 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all flex items-center gap-3 shadow-xl shadow-white/5 active:scale-95"
        >
          <RefreshCw size={16} />
          Retry Connection
        </button>
      )}
    </div>
  );
}
