"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const isProductPage = pathname?.includes("/product");

    return (
        <header
            className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
                <Link href={isProductPage ? "/product/leadzen" : "/euonex"} className="flex items-center gap-2 group cursor-pointer">
                    {/* Logo Icon */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center shadow-lg logo-glow transition-transform group-hover:scale-105">
                        <span className="text-white font-semibold text-sm">
                            {isProductPage ? "LZ" : "E"}
                        </span>
                    </div>

                    {/* Logo Text */}
                    <div className="flex flex-col leading-tight">
                        <span className="text-white font-semibold text-lg tracking-wide group-hover:text-white/90 transition-colors">
                            {isProductPage ? "Leadzen" : "Euonex"}
                        </span>
                        {isProductPage && (
                            <span className="text-[10px] text-gray-500 font-medium tracking-wide">
                                by Euonex
                            </span>
                        )}
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-body font-medium tracking-wide text-gray-400">
                    <Link href="/euonex" className="hover:text-white transition-colors">Home</Link>
                    <Link href="/euonex/products" className="hover:text-white transition-colors">Products</Link>
                    <a href="#about" className="hover:text-white transition-colors cursor-pointer">About</a>
                    <a href="#contact" className="hover:text-white transition-colors cursor-pointer">Contact</a>
                </div>

                <Link
                    href="/auth/login"
                    className="px-5 py-2 rounded-full bg-white text-black text-sm font-body font-medium hover:opacity-90 transition active:scale-95 shadow-xl shadow-white/5"
                >
                    Get Demo
                </Link>
            </div>
        </header>
    );
}
