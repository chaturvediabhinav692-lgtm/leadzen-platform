"use client";

import Link from "next/link";

interface HeroProps {
    title: string;
    subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
    return (
        <section className="pt-32 pb-24 text-center relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
                <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight leading-tight text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.05)] mb-6">
                    {title}
                </h1>

                <p className="mt-6 font-body text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <Link
                        href="/euonex/products"
                        className="px-6 py-3 rounded-full bg-white text-black font-body font-medium hover:opacity-90 transition shadow-xl shadow-white/5 active:scale-95"
                    >
                        View Products
                    </Link>
                    <Link
                        href="#contact"
                        className="px-6 py-3 rounded-full border border-white/20 text-white font-body font-medium hover:bg-white/10 transition active:scale-95"
                    >
                        Get Demo
                    </Link>
                </div>
            </div>
        </section>
    );
}
