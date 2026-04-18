import React from 'react';
import { ShieldX, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class GlobalErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log violation to telemetry node (console in dev only)
    if (import.meta.env.DEV) {
      console.error('SYSTEM_CRITICAL_EXCEPTION', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6 text-white selection:bg-red-500/30">
          <div className="max-w-md w-full text-center space-y-12 animate-fade-in">
            <div className="relative inline-block group">
               <div className="absolute inset-0 bg-red-500/10 blur-[80px] rounded-full group-hover:bg-red-500/20 transition-all duration-500" />
               <div className="relative w-32 h-32 rounded-[3rem] bg-white/5 border border-white/10 flex items-center justify-center text-red-500 shadow-2xl">
                  <ShieldX size={64} strokeWidth={1} />
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-center gap-3 text-red-500 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60">System Core Violation</span>
               </div>
               <h1 className="text-4xl font-black uppercase tracking-tighter">Instance Crash</h1>
               <p className="text-white/40 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                 A critical exception was detected in the React render cycle. 
                 State integrity has been compromised.
               </p>
               {this.state.error && (
                 <div className="text-[10px] font-mono text-red-400 bg-red-500/5 p-4 rounded-2xl border border-red-500/10 mt-6 break-all">
                    {this.state.error.message}
                 </div>
               )}
            </div>

            <button 
              onClick={this.handleReset}
              className="w-full px-8 py-5 rounded-[2rem] bg-white text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-emerald-400 transition-all shadow-2xl shadow-white/5 flex items-center justify-center gap-3 active:scale-95"
            >
               <RefreshCw size={16} />
               Re-Synchronize App
            </button>

            <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.4em] pt-12">
              Global Failure Node 0-Q | Status: UNRECOVERABLE_EXCEPTION
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
