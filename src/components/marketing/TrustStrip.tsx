"use client";

import { motion } from "framer-motion";

export default function TrustStrip() {
    const items = ["Built for speed", "Built for conversion", "Built for scale"];

    return (
        <div className="py-12 border-y border-white/5 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                            {item}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
