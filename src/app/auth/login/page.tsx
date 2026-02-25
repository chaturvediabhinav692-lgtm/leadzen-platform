"use client";

import { useStore } from "@/lib/store";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Building2, UserCircle2 } from "lucide-react";

export default function LoginPage() {
    const { setRole } = useStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const product = searchParams.get('product') || 'Leadzen';

    console.log("AUTH PAGE LOADED (ROOT/LOGIN)");

    const handleLogin = (role: 'owner' | 'broker') => {
        setRole(role);
        window.location.href = '/euonex/products';
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-purple-500/30">
            <div className="absolute inset-0 bg-purple-600/5 blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-12 flex flex-col items-center group">
                    <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-purple-800 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.5)] mb-6 transition-transform group-hover:scale-105">
                        <span className="text-white font-black text-2xl tracking-widest">LZ</span>
                        <div className="absolute inset-0 rounded-3xl border border-purple-400/30 blur-[3px]"></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-heading font-black text-white tracking-tighter mb-1">Leadzen</h1>
                        <span className="text-[10px] text-purple-400 font-body tracking-[0.3em] uppercase font-bold opacity-80">Automation Platform</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => handleLogin('owner')}
                        className="w-full p-6 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-6 hover:bg-white/[0.06] hover:border-white/10 transition-all group group-hover:shadow-2xl active:scale-[0.98]"
                    >
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                            <Building2 size={24} />
                        </div>
                        <div className="text-left">
                            <p className="text-white font-bold text-lg leading-none mb-1">Business Owner</p>
                            <p className="text-slate-500 text-xs font-medium">Manage team and platform metrics</p>
                        </div>
                    </button>

                    <button
                        onClick={() => handleLogin('broker')}
                        className="w-full p-6 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-6 hover:bg-white/[0.06] hover:border-white/10 transition-all group group-hover:shadow-2xl active:scale-[0.98]"
                    >
                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                            <UserCircle2 size={24} />
                        </div>
                        <div className="text-left">
                            <p className="text-white font-bold text-lg leading-none mb-1">Service Professional</p>
                            <p className="text-slate-500 text-xs font-medium">Manage leads and daily action queue</p>
                        </div>
                    </button>
                </div>

                <p className="mt-12 text-center text-xs text-slate-600 font-medium md:max-w-[280px] mx-auto leading-relaxed">
                    By continuing, you agree to Euonex's Terms of Service and Privacy Policy.
                </p>
            </motion.div>
        </div>
    );
}
