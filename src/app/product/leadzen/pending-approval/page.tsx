"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Clock, ShieldAlert, ArrowLeft, LogOut } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PendingApprovalPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user && user.status === "active") {
            if (user.role === 'owner') router.push("/product/leadzen/dashboard/business");
            else if (user.role === 'broker') router.push("/product/leadzen/dashboard/professional");
        }
    }, [user, router]);

    return (
        <AuthLayout>
            <div className="text-center space-y-8">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center relative">
                        <Clock className="w-10 h-10 text-purple-500 animate-pulse" />
                        <div className="absolute -top-1 -right-1">
                            <div className="bg-purple-500 text-white p-1 rounded-full border-4 border-black">
                                <ShieldAlert className="w-3 h-3" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-black tracking-tighter italic uppercase text-white">Access Pending</h1>
                    <div className="space-y-2">
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">
                            Your identity verification is currently in progress.
                            An administrator will review your application shortly.
                        </p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            Response window: 2-4 standard hours
                        </p>
                    </div>
                </div>

                <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl text-left">
                    <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Registration Details</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between text-[11px]">
                            <span className="text-slate-600 uppercase font-black">Operator</span>
                            <span className="text-white font-bold">{user?.email}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                            <span className="text-slate-600 uppercase font-black">Status</span>
                            <span className="text-purple-400 font-black uppercase italic">Authentication Pending</span>
                        </div>
                    </div>
                </div>

                <div className="pt-8 flex flex-col gap-4">
                    <button
                        onClick={logout}
                        className="flex items-center justify-center gap-2 text-[10px] text-slate-500 hover:text-white transition-colors uppercase font-black tracking-widest group"
                    >
                        <LogOut className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Sign out of operative
                    </button>

                    <Link
                        href="/euonex"
                        className="flex items-center justify-center gap-2 text-[10px] text-slate-700 hover:text-white transition-colors uppercase font-black tracking-widest group"
                    >
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Return to site
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
