"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface ProductCardProps {
    title: string;
    description: string;
    href: string;
    tag?: string;
    features?: string[];
    preview?: React.ReactNode;
    secondaryHref?: string;
    secondaryLabel?: string;
}

export default function ProductCard({
    title,
    description,
    href,
    tag,
    features,
    preview,
    secondaryHref,
    secondaryLabel
}: ProductCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="group relative !bg-[#0B0B0F] border border-white/10 rounded-lg p-6 overflow-hidden transition-all duration-300 flex flex-col md:flex-row h-full"
            style={{ perspective: 1000 }}
        >

            <div className="flex-1 p-10 flex flex-col justify-between relative z-10">
                <div>
                    {tag && (
                        <div className="mb-6">
                            <span className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded flex items-center w-fit gap-1.5 font-medium">
                                <Sparkles size={10} /> {tag}
                            </span>
                        </div>
                    )}
                    <h3 className="text-3xl font-black text-white mb-6 group-hover:text-blue-400 transition-colors tracking-tight italic">{title}</h3>
                    <p className="text-gray-400 mb-10 leading-relaxed text-sm font-medium">
                        {description}
                    </p>

                    {features && (
                        <ul className="space-y-4 mb-12">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-xs text-slate-500 font-bold group/item">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover/item:scale-150 transition-transform" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex flex-wrap gap-4">
                    <Link
                        href={href}
                        className="px-6 py-3 bg-white text-black font-black rounded-xl hover:bg-slate-200 transition-all active:scale-95 text-xs flex items-center gap-2 relative z-40"
                    >
                        View Product <ArrowRight className="w-3 h-3" />
                    </Link>
                    {secondaryHref && (
                        <Link
                            href={secondaryHref}
                            className="px-6 py-3 bg-[#1a1a1a] text-white border border-white/5 font-black rounded-xl hover:bg-white/5 transition-all active:scale-95 text-xs"
                        >
                            {secondaryLabel || 'Get Demo'}
                        </Link>
                    )}
                </div>
            </div>

            {
                preview && (
                    <div className="hidden lg:block w-2/5 md:w-1/2 bg-[#050505] border-l border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none" />
                        <div className="h-full flex items-center justify-center p-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                            {preview}
                        </div>
                    </div>
                )
            }
        </motion.div >
    );
}
