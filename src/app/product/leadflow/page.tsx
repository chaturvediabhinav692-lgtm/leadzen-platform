"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LeadflowLanding() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col font-sans">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />

            {/* Header Bar */}
            <div className="relative z-20 w-full flex justify-between items-center px-8 py-6 border-b border-white/10 backdrop-blur-md">
                {/* LEFT: LOGO */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center">
                            <span className="text-xl font-black italic text-purple-500">LZ</span>
                        </div>
                        <div className="text-white font-bold text-lg tracking-tight">
                            Leadzen
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <a href="#plans" className="hover:text-white transition-colors cursor-pointer tracking-[0.2em]">Plans</a>
                    </div>
                </div>

                {/* RIGHT: ACTIONS */}
                <div className="flex gap-4">
                    <button
                        onClick={() => router.push('/product/leadflow/auth')}
                        className="px-6 py-2 border border-white/20 rounded-xl text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all active:scale-[0.98]"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => router.push('/product/leadflow/signup')}
                        className="px-6 py-2 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-[0.98]"
                    >
                        Create Account
                    </button>
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-20">
                <h1 className="text-5xl md:text-6xl font-bold text-center text-white mt-16 mb-6 tracking-tight">
                    Leadzen
                </h1>

                <div className="mt-6 md:mt-10 space-y-4">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-purple-500 text-sm mb-4 font-black uppercase tracking-[0.3em]"
                    >
                        Automation Engine for Service Businesses
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed"
                    >
                        Leadzen is a specialized automation system built for professional service businesses.
                        It centralizes lead capture, qualification, and follow-ups into a single workflow,
                        enabling teams to respond faster, convert more prospects, and eliminate manual coordination.
                    </motion.p>
                </div>

                {/* Features Grid - Purely Informational */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] backdrop-blur-xl"
                >
                    {[
                        {
                            title: "Lead Capture & Routing",
                            desc: "Automatically collect, categorize, and assign incoming leads based on priority and source."
                        },
                        {
                            title: "Real-Time Communication",
                            desc: "Integrated WhatsApp and messaging workflows to engage leads instantly and consistently."
                        },
                        {
                            title: "Universal Dashboards",
                            desc: "Role-specific dashboards for teams and managers to track performance and pipeline health."
                        }
                    ].map((feature, i) => (
                        <div key={i} className="space-y-2 text-left md:text-center px-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-purple-500/10 rounded-xl mb-4 mx-auto hidden md:flex">
                                <CheckCircle2 className="w-5 h-5 text-purple-500" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-white leading-tight min-h-[2.5rem] flex items-center justify-center">{feature.title}</h3>
                            <p className="text-xs text-slate-500 font-bold leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Built for Execution Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 max-w-3xl text-center space-y-4"
                >
                    <h2 className="text-2xl font-bold bg-white/90 bg-clip-text text-transparent italic uppercase tracking-wider mb-8">
                        Built for Execution, Not Just Tracking
                    </h2>
                </motion.div>

                {/* How Leadzen Works */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-24 max-w-5xl text-center"
                >
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-12 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">How Leadzen Works</h2>

                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {[
                            { step: "1. Capture", desc: "Leads from WhatsApp, forms, and campaigns are automatically captured and organized into a structured pipeline." },
                            { step: "2. Qualify", desc: "Leads are categorized based on priority, intent, and activity, ensuring your team focuses on the right opportunities." },
                            { step: "3. Convert", desc: "Automated follow-ups and real-time engagement ensure faster responses and higher conversion rates." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm">
                                <h3 className="text-lg font-black uppercase tracking-widest text-purple-500 mb-4">{item.step}</h3>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Who Leadzen Is Built For */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-24 max-w-5xl text-center"
                >
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-12 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Who Leadzen Is Built For</h2>

                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        {[
                            { title: "Service Businesses", desc: "Manage client inquiries, automate follow-ups, and track conversions across multiple team members and branches." },
                            { title: "Enterprise Teams", desc: "Track high-volume leads, manage professional pipelines, and ensure no high-intent prospect is missed." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm hover:border-purple-500/20 transition-all">
                                <h3 className="text-xl font-black uppercase tracking-widest text-white mb-4">{item.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Pricing Plans Section */}
                <motion.section
                    id="plans"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="mt-32 max-w-5xl w-full text-center"
                >
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Plans</h2>
                    <p className="text-gray-500 font-medium mb-12">
                        Choose a plan that fits your business growth.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* PLAN 1: Starter */}
                        <div className="border border-white/5 bg-white/[0.02] rounded-[2.5rem] p-10 text-left hover:border-purple-500/30 transition-all backdrop-blur-xl flex flex-col h-full group">
                            <h3 className="text-xl font-black uppercase tracking-widest text-white mb-2">Starter</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-5xl font-black text-white">$69</span>
                                <span className="text-sm text-slate-500 font-bold uppercase tracking-widest">/month</span>
                            </div>

                            <ul className="space-y-4 text-gray-500 font-medium mb-10 flex-1">
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-purple-500" /> WhatsApp Automation</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-purple-500" /> Lead Capture & Routing</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-purple-500" /> Real-time Messaging</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-purple-500" /> Dashboard Access</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-purple-500" /> Basic Analytics</li>
                            </ul>

                            <button
                                onClick={() => router.push('/product/leadflow/signup')}
                                className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-[0.98] shadow-xl shadow-white/5"
                            >
                                Get Started
                            </button>
                        </div>

                        {/* PLAN 2: Growth */}
                        <div className="relative border border-purple-500/50 bg-gradient-to-b from-purple-900/10 to-transparent rounded-[2.5rem] p-10 text-left backdrop-blur-xl flex flex-col h-full overflow-hidden">
                            <div className="absolute top-0 right-0 px-4 py-1.5 bg-purple-500 text-[10px] font-black uppercase tracking-[0.2em] text-white rounded-bl-2xl">
                                Recommended
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-widest text-white mb-2">Growth</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-5xl font-black text-white">$199</span>
                                <span className="text-sm text-slate-500 font-bold uppercase tracking-widest">/month</span>
                            </div>

                            <ul className="space-y-4 text-gray-400 font-medium mb-10 flex-1">
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Everything in Starter</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Custom Website Dev</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Website Management</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Full Funnel Setup</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Priority Support</li>
                            </ul>

                            <button
                                onClick={() => router.push('/product/leadflow/signup')}
                                className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-500 transition-all active:scale-[0.98] shadow-2xl shadow-purple-500/20"
                            >
                                Choose Plan
                            </button>
                        </div>
                    </div>
                </motion.section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-24 max-w-5xl text-center"
                >
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-12 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Why Leadzen</h2>

                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {[
                            { title: "No Lead Leakage", desc: "Every lead is tracked, assigned, and followed up automatically — nothing falls through the cracks." },
                            { title: "Faster Response Time", desc: "Engage leads instantly with automated workflows and real-time notifications." },
                            { title: "Operational Clarity", desc: "Get full visibility into team performance, lead status, and conversion metrics." }
                        ].map((item, i) => (
                            <div key={i} className="space-y-4">
                                <h3 className="text-lg font-black uppercase tracking-widest text-white border-l-2 border-purple-500 pl-4">{item.title}</h3>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Final CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-32 w-full max-w-4xl p-12 bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-[3rem] text-center space-y-8 backdrop-blur-xl"
                >
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
                            Start Managing Leads the Right Way
                        </h2>
                        <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
                            Apply for access and get your system activated within 24 hours.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
                        <button
                            onClick={() => router.push('/product/leadflow/signup')}
                            className="px-10 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-white/5 hover:bg-slate-200 transition-all active:scale-[0.98]"
                        >
                            Create Account
                        </button>

                        <button
                            onClick={() => router.push('/product/leadflow/auth')}
                            className="px-10 py-4 border border-white/10 bg-white/5 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-[0.98]"
                        >
                            Login
                        </button>
                    </div>
                </motion.div>

                {/* Exit Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    <Link
                        href="/euonex/products"
                        className="inline-flex items-center gap-2 text-[10px] text-slate-700 hover:text-white transition-colors uppercase font-black tracking-widest group"
                    >
                        <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                        Back to Products
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
