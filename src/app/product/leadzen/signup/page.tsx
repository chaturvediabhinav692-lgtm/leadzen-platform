"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, User, Briefcase, Building2, MapPin, Phone, ShieldCheck } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const { signup } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        profession: "",
        businessName: "",
        city: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signup(formData);
        router.push("/product/leadzen/pending-approval");
    };

    return (
        <AuthLayout>
            <div className="flex justify-between items-center mb-10">
                <Link href="/product/leadzen/auth" className="flex items-center gap-2 group">
                    <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Back to Login</span>
                </Link>
            </div>

            <div className="space-y-4 mb-10 text-center flex flex-col items-center group">
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center shadow-lg logo-glow transition-transform group-hover:scale-105">
                    <span className="text-white font-black text-xl tracking-widest">LZ</span>
                    <div className="absolute inset-0 rounded-2xl border border-purple-400/30 blur-[2px]"></div>
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-heading font-black tracking-tighter italic uppercase text-white">Platform Access</h1>
                    <p className="text-purple-400 font-body text-[10px] font-black uppercase tracking-[0.3em] mt-1">Global Infrastructure by Euonex</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Name</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors">
                                <User className="w-4 h-4" />
                            </div>
                            <input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter your name"
                                className="w-full p-4 pl-12 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-purple-500/50 focus:bg-white/[0.05] outline-none transition-all text-sm font-medium text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Phone Number</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors">
                                <Phone className="w-4 h-4" />
                            </div>
                            <input
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Enter phone number"
                                className="w-full p-4 pl-12 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-purple-500/50 focus:bg-white/[0.05] outline-none transition-all text-sm font-medium text-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors">
                            <Mail className="w-4 h-4" />
                        </div>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email"
                            className="w-full p-4 pl-12 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-purple-500/50 focus:bg-white/[0.05] outline-none transition-all text-sm font-medium text-white"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Profession</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors">
                            <Briefcase className="w-4 h-4" />
                        </div>
                        <input
                            required
                            value={formData.profession}
                            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                            placeholder="Enter your profession"
                            className="w-full p-4 pl-12 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-purple-500/50 focus:bg-white/[0.05] outline-none transition-all text-sm font-medium text-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Business Name</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors">
                                <Building2 className="w-4 h-4" />
                            </div>
                            <input
                                required
                                value={formData.businessName}
                                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                placeholder="Enter business name"
                                className="w-full p-4 pl-12 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-purple-500/50 focus:bg-white/[0.05] outline-none transition-all text-sm font-medium text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">City</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <input
                                required
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                placeholder="Enter your city"
                                className="w-full p-4 pl-12 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-purple-500/50 focus:bg-white/[0.05] outline-none transition-all text-sm font-medium text-white"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-slate-200 active:scale-[0.98] shadow-2xl shadow-white/5 mt-6"
                >
                    Submit Registration
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    By submitting, you agree to our terms of access.
                </p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-slate-600">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-widest">Secured by Euonex Infrastructure</span>
            </div>

            <div className="mt-8 flex justify-center pb-2">
                <a
                    href="/product/leadzen"
                    className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all"
                >
                    <span className="transform group-hover:-translate-x-1 transition-transform duration-200">
                        ←
                    </span>
                    Back to Product
                </a>
            </div>
        </AuthLayout>
    );
}
