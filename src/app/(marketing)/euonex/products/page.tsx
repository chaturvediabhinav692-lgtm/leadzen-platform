"use client";

import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-purple-500/30 flex flex-col items-center justify-start pt-28 md:pt-32">
            <Navbar />

            {/* Premium Background Layers */}
            <div className="absolute inset-0 bg-black z-0" />
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-purple-600/10 blur-[180px] rounded-full z-0 pointer-events-none" />

            {/* BASELINE STABLE VERSION — DO NOT MODIFY STRUCTURE */}
            <main className="bg-black">
                {/* Hero Section */}
                <section className="bg-black pt-24 pb-12 relative z-10">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-sm text-purple-500 uppercase tracking-wide mb-6">
                                Automation Platform
                            </h2>

                            <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                                Euonex provides a suite of automation-driven tools designed to streamline operations, enhance response efficiency, and optimize team performance across multiple industries.
                            </p>

                            <p className="text-md text-gray-400 text-center max-w-2xl mx-auto mt-4 leading-relaxed">
                                Built for modern businesses, the platform replaces manual workflows with structured, scalable, and intelligent systems.
                            </p>

                            <p className="text-sm text-gray-500 text-center mt-6">
                                Select a product below to get started.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Product Grid */}
                <section className="bg-black py-24 relative z-10">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* LeadFlow - Active Flagship */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="group relative cursor-pointer"
                                onClick={() => router.push("/product/leadzen")}
                            >
                                <div className="relative bg-[#0B0B0F] border border-white/10 rounded-[2rem] p-4 shadow-xl overflow-hidden transition-all duration-300 flex flex-col h-full hover:bg-[#111115] hover:border-white/20">
                                    <div className="bg-[#050505] border border-white/5 p-6 rounded-[1.5rem] relative overflow-hidden transition-all duration-700 flex-1">
                                        <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">LEADZEN</div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Active</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            {[
                                                { name: "Workflow", status: "Active" },
                                                { name: "Activity", status: "Sync" },
                                                { name: "Tasks", status: "Live" },
                                                { name: "Metrics", status: "Stable" }
                                            ].map((module) => (
                                                <div key={module.name} className="bg-[#0B0B0F] border border-white/10 p-3 rounded-xl">
                                                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-wider mb-1">{module.name}</p>
                                                    <p className="text-[10px] font-bold text-white tracking-tight">{module.status}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-4 border-t border-white/10">
                                            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">Leadzen</h3>
                                            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                                                WhatsApp-first automation engine for high-performance sales teams.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 px-4 pb-2">
                                        <div className="w-full py-3 bg-white text-black text-center rounded-xl font-black text-xs uppercase tracking-widest">
                                            View Product
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Coming Soon Products */}
                            {[
                                {
                                    title: "NextGen CRM",
                                    description: "Advanced client relationship system designed for massive scale.",
                                    tag: "COMING SOON"
                                },
                                {
                                    title: "AutoSystem AI",
                                    description: "Automated brokerage execution and risk management layer.",
                                    tag: "COMING SOON"
                                },
                                {
                                    title: "Kribble",
                                    description: "AI-powered engagement automation platform for modern businesses.",
                                    tag: "COMING SOON"
                                },
                                {
                                    title: "FlowStack",
                                    description: "Unified data orchestration layer for high-performance teams.",
                                    tag: "COMING SOON"
                                },
                                {
                                    title: "NexCRM",
                                    description: "Advanced CRM system designed for scalable operations.",
                                    tag: "COMING SOON"
                                }
                            ].map((product, i) => (
                                <motion.div
                                    key={product.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: (i + 1) * 0.1 }}
                                >
                                    <div className="relative bg-[#0B0B0F] border border-white/10 rounded-[2rem] p-8 h-full flex flex-col items-center justify-center text-center transition-all duration-300 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 group">
                                        {/* Icon Placeholder Block */}
                                        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl mb-8 flex items-center justify-center group-hover:border-white/20 transition-all">
                                            <div className="w-6 h-6 bg-white/10 rounded rotate-45" />
                                        </div>

                                        <div className="mb-4 bg-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                                            {product.tag}
                                        </div>

                                        <h3 className="text-2xl font-black text-white mb-4 tracking-tighter italic uppercase">
                                            {product.title}
                                        </h3>

                                        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[240px]">
                                            {product.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="bg-black relative z-10 border-t border-white/5 py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <p className="text-center text-slate-500 text-sm font-black uppercase tracking-[0.3em] mb-12">
                            Trusted by fast-growing teams
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale contrast-200">
                            {['Stripe', 'Linear', 'Vercel', 'Notion', 'Flow'].map((name) => (
                                <span key={name} className="text-2xl font-black text-white italic tracking-tighter">
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
