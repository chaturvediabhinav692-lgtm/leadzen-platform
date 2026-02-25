"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const { login, googleLogin } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const user = await login(email, password);

        if (user) {
            if (user.status === "pending") {
                setError("Your account is under review. Please wait for admin approval.");
                return;
            }

            if (user.status === "rejected") {
                setError("Your account request was rejected.");
                return;
            }

            if (user.status !== "approved") {
                setError("Account status unknown. Contact support.");
                return;
            }

            if (user.token === "") {
                setError("Authentication failed.");
                return;
            }

            if (user.role === "coaching") {
                router.push("/product/leadflow/dashboard/business");
            } else if (user.role === "broker") {
                router.push("/product/leadflow/dashboard/professional");
            } else if (user.role === "admin") {
                router.push("/admin-dashboard");
            }
        } else {
            setError("Invalid credentials or account not found.");
        }
    };

    return (
        <AuthLayout>
            <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black text-center uppercase tracking-widest">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors">
                                <Mail className="w-4 h-4" />
                            </div>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                required
                                placeholder="id@euonex.io"
                                className="w-full p-4 pl-12 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-purple-500/50 focus:bg-white/[0.05] outline-none transition-all text-sm font-medium text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Access Key</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full p-4 pl-12 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-purple-500/50 focus:bg-white/[0.05] outline-none transition-all text-sm font-medium text-white"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-slate-200 active:scale-[0.98] shadow-2xl shadow-white/5 mt-4"
                    >
                        Sign In
                    </button>
                </div>

                <div className="flex items-center gap-4 text-white/10 text-[9px] font-black uppercase tracking-[0.3em]">
                    <div className="flex-1 h-[1px] bg-white/5"></div>
                    OR
                    <div className="flex-1 h-[1px] bg-white/5"></div>
                </div>

                <button
                    type="button"
                    onClick={googleLogin}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-[11px] font-black uppercase tracking-widest active:scale-[0.98]"
                >
                    <img src="/google.svg" className="w-4 h-4" alt="Google" />
                    Continue with Google
                </button>
            </form>
        </AuthLayout>
    );
}
