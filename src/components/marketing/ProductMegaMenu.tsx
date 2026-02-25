"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

interface ProductMegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const products = [
    {
        id: "leadflow",
        name: "Leadflow",
        description: "WhatsApp-first lead conversion system for high-performance teams",
        href: "/euonex/products",
        active: true,
    },
    {
        id: "kribble",
        name: "Kribble",
        description: "AI-powered engagement automation platform",
        href: "#",
        active: false,
    },
    {
        id: "flowstack",
        name: "FlowStack",
        description: "Data orchestration for modern businesses",
        href: "#",
        active: false,
    },
    {
        id: "nexcrm",
        name: "NexCRM",
        description: "Advanced CRM built for scale",
        href: "#",
        active: false,
    }
];

export default function ProductMegaMenu({ isOpen, onClose }: ProductMegaMenuProps) {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 z-50 shadow-2xl mt-0"
            onMouseLeave={onClose}
        >
            <div className="max-w-7xl mx-auto px-6 py-10 flex gap-16">
                {/* Left Side */}
                <div className="w-1/4">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-4">Products</h2>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">
                        Explore Euonex platforms designed for growth and automation.
                    </p>

                    <div className="mt-10 p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                        <p className="text-[10px] font-black uppercase text-purple-400 tracking-widest mb-2 flex items-center gap-1.5">
                            <Sparkles size={10} /> Ecosystem Update
                        </p>
                        <p className="text-xs text-slate-500 font-bold leading-relaxed">
                            Leadflow integration with advanced CRM modules is now live for enterprise partners.
                        </p>
                    </div>
                </div>

                {/* Right Side - Grid */}
                <div className="flex-1 grid grid-cols-2 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="group flex">
                            {product.active ? (
                                <Link
                                    href={product.href}
                                    onClick={onClose}
                                    className="flex-1 p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group/card"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-md font-extrabold text-white group-hover/card:text-blue-400 transition-colors uppercase tracking-tight italic">
                                            {product.name}
                                        </h3>
                                        <ArrowRight size={14} className="text-slate-600 group-hover/card:text-blue-400 group-hover/card:translate-x-1 transition-all" />
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                        {product.description}
                                    </p>
                                </Link>
                            ) : (
                                <div className="flex-1 p-5 rounded-lg border border-white/[0.02] bg-white/[0.01] opacity-60 grayscale cursor-not-allowed">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-md font-extrabold text-white uppercase tracking-tight italic">
                                            {product.name}
                                        </h3>
                                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-black uppercase tracking-widest">
                                            Soon
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
