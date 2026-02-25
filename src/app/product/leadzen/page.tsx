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
            <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
                    {/* LEFT: LOGO */}
                    <Link href="/product/leadzen" className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center shadow-lg logo-glow transition-transform group-hover:scale-105">
                            <span className="text-white font-semibold text-sm">LZ</span>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-white font-semibold text-lg tracking-wide group-hover:text-white/90 transition-colors">
                                Leadzen
                            </span>
                            <span className="text-[10px] text-gray-500 font-medium tracking-wide">
                                by Euonex
                            </span>
                        </div>
                    </Link>

                    {/* RIGHT: ACTIONS */}
                    <div className="flex gap-4">

                        <button
                            onClick={() => {
                                const el = document.getElementById('plans');
                                if (el) {
                                    el.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                    router.push('/product/leadzen#plans');
                                }
                            }}
                            className="px-6 py-2 bg-white text-black rounded-full font-body font-semibold hover:opacity-90 transition active:scale-95 text-xs shadow-lg shadow-white/5"
                        >
                            View Plans
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-24 relative z-10 flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8"
                >
                    <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center text-white text-3xl shadow-lg logo-glow transition-transform hover:scale-105 mx-auto">
                        LZ
                    </div>
                </motion.div>

                <div className="space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight max-w-4xl drop-shadow-glow"
                    >
                        We Build Systems That <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Convert</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-body text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Automation-driven platforms engineered for speed, scalability, and measurable growth.
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
                <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto md:px-10">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight text-center">Who It's Built For</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { title: "Service Businesses", desc: "Manage client inquiries, automate follow-ups, and track conversions across multiple team members and branches." },
                            { title: "Enterprise Teams", desc: "Track high-volume leads, manage professional pipelines, and ensure no high-intent prospect is missed." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 bg-card border border-white/10 rounded-2xl hover:border-white/20 transition-all group">
                                <h3 className="font-heading text-xl font-bold text-white mb-4 group-hover:text-accent transition-colors">{item.title}</h3>
                                <p className="font-body text-gray-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pricing Plans Section */}
                <section id="plans" className="py-32 md:py-40 px-6 max-w-7xl mx-auto md:px-10 text-center">
                    <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Standardized Plans</h2>
                    <p className="font-body text-gray-400 text-lg md:text-xl mb-20 max-w-2xl mx-auto leading-relaxed">
                        Precision-engineered licensing for high-growth operations.
                    </p>

                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto text-left items-stretch">
                        {/* Starter Plan */}
                        <div className="border border-white/10 bg-[#050507] rounded-[2.5rem] p-12 flex flex-col h-full hover:border-white/20 transition-all group">
                            <div className="mb-8">
                                <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">$69<span className="text-xl text-gray-500 font-medium tracking-normal"> / month</span></h3>
                                <p className="font-body text-gray-400 font-semibold uppercase tracking-[0.2em] text-[10px]">Automation Infrastructure</p>
                            </div>

                            <ul className="font-body text-gray-400 space-y-5 mb-12 flex-1">
                                <li className="flex items-center gap-4">
                                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <span className="text-sm font-medium">WhatsApp Bridge Engine</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <span className="text-sm font-medium">Capture & Routing Layer</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <span className="text-sm font-medium">Universal Command Center</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <span className="text-sm font-medium">Activity Stream Logic</span>
                                </li>
                            </ul>

                            <button
                                onClick={() => {
                                    const el = document.getElementById('plans');
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                        router.push('/product/leadzen#plans');
                                    }
                                }}
                                className="w-full px-8 py-5 rounded-2xl bg-white text-black font-body font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-slate-200 active:scale-[0.98] shadow-2xl shadow-white/5"
                            >
                                View Plans
                            </button>
                        </div>

                        {/* Growth Plan */}
                        <div className="relative border border-accent/40 bg-[#050507] rounded-[2.5rem] p-12 flex flex-col h-full transition-all hover:border-accent shadow-2xl shadow-accent/5 md:scale-105 z-20">
                            <div className="absolute top-6 right-8 px-4 py-1.5 bg-accent text-[10px] font-black uppercase tracking-[0.2em] text-white rounded-full">
                                Recommended Plan
                            </div>

                            <div className="mb-8">
                                <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">$199<span className="text-xl text-gray-500 font-medium tracking-normal"> / month</span></h3>
                                <p className="font-body text-accent font-semibold uppercase tracking-[0.2em] text-[10px]">Enterprise Infrastructure</p>
                            </div>

                            <ul className="font-body text-gray-400 space-y-5 mb-12 flex-1">
                                <li className="flex items-center gap-4">
                                    <div className="p-1.5 rounded-lg bg-accent/20 text-accent">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <span className="text-sm font-medium text-white">Full Funnel Automations</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="p-1.5 rounded-lg bg-accent/20 text-accent">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <span className="text-sm font-medium text-white">Custom Brand Portal</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="p-1.5 rounded-lg bg-accent/20 text-accent">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <span className="text-sm font-medium text-white">White-Glove Setup</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="p-1.5 rounded-lg bg-accent/20 text-accent">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <span className="text-sm font-medium text-white">24/7 Priority Ops</span>
                                </li>
                            </ul>

                            <button
                                onClick={() => {
                                    window.open('mailto:euonex@gmail.com', '_blank');
                                }}
                                className="w-full px-8 py-5 rounded-2xl bg-accent text-white font-body font-black text-xs uppercase tracking-[0.2em] transition-all hover:opacity-90 active:scale-[0.98] shadow-2xl shadow-accent/20"
                            >
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-24 md:py-32 px-6 relative overflow-hidden w-full">
                    <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                        <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                            Start Managing Leads the Right Way
                        </h2>
                        <p className="font-body text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Apply for access and get your system activated within 24 hours.
                        </p>

                        <div className="flex justify-center pt-4">
                            <button
                                onClick={() => {
                                    const el = document.getElementById('plans');
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                        router.push('/product/leadzen#plans');
                                    }
                                }}
                                className="px-10 py-5 bg-white text-black font-body font-black uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition shadow-xl shadow-white/5 active:scale-95 text-sm"
                            >
                                View Pricing Plans
                            </button>
                        </div>
                    </div>
                </section>

                {/* Exit Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="pb-20"
                >
                    <Link
                        href="/euonex/products"
                        className="inline-flex items-center gap-2 text-xs font-body text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest group"
                    >
                        <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                        Back to Products
                    </Link>
                </motion.div>
            </main>
        </div>
    );
}
