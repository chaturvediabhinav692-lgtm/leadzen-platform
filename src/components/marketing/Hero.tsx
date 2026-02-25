"use client";

import Link from "next/link";

interface HeroProps {
    title: string;
    subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
    return (
        <section className="bg-black py-24 relative z-0">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h1 className="text-white text-5xl md:text-6xl font-bold mb-6">
                    {title}
                </h1>

                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                    {subtitle}
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        href="/euonex/products"
                        className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-slate-200 transition-all"
                    >
                        View Products
                    </Link>
                    <Link
                        href="#"
                        className="border border-gray-600 text-white px-6 py-3 rounded-full hover:bg-white/5 transition-all"
                    >
                        Get Demo
                    </Link>
                </div>
            </div>
        </section>
    );
}
