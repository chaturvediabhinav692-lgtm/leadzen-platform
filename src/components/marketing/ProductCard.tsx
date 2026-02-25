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
            whileHover={{ scale: 1.02 }}
            className="group relative bg-card border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-300 flex flex-col md:flex-row h-full hover:border-white/20 shadow-xl hover:shadow-glow/5"
        >
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative z-10">
                <div>
                    {tag && (
                        <div className="mb-4">
                            <span className="bg-white/5 text-gray-400 text-[10px] px-2 py-0.5 rounded-full border border-white/10 flex items-center w-fit gap-1.5 font-bold uppercase tracking-wider">
                                <Sparkles size={10} className="text-accent" /> {tag}
                            </span>
                        </div>
                    )}
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3 transition-colors group-hover:text-accent-2">{title}</h3>
                    <p className="text-gray-400 font-body mb-8 leading-relaxed text-sm md:text-base">
                        {description}
                    </p>

                    {features && (
                        <ul className="space-y-3 mb-10">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-xs text-gray-400 font-body group/item">
                                    <div className="w-1 h-1 rounded-full bg-accent shadow-[0_0_8px_rgba(124,58,237,0.5)] group-hover/item:scale-150 transition-transform" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex flex-wrap gap-4">
                    <Link
                        href={href}
                        className="px-6 py-2.5 bg-white text-black font-body font-semibold rounded-full hover:opacity-90 transition-all active:scale-95 text-xs flex items-center gap-2 relative z-40 shadow-lg shadow-white/10"
                    >
                        View Product <ArrowRight className="w-3 h-3" />
                    </Link>
                    {secondaryHref && (
                        <Link
                            href={secondaryHref}
                            className="px-6 py-2.5 bg-white/5 text-white border border-white/10 font-body font-semibold rounded-full hover:bg-white/10 transition-all active:scale-95 text-xs"
                        >
                            {secondaryLabel || 'Get Demo'}
                        </Link>
                    )}
                </div>
            </div>

            {preview && (
                <div className="hidden lg:block w-2/5 md:w-1/2 bg-black/40 border-l border-white/10 relative overflow-hidden backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                    <div className="h-full flex items-center justify-center p-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                        {preview}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
