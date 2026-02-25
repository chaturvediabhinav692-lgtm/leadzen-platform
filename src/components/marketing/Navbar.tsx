"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-30 bg-black/60 backdrop-blur-md border-b border-white/5"
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/euonex" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg shadow-lg shadow-purple-500/20" />
                    <span className="text-xl font-black text-white tracking-tighter">Euonex</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-black uppercase tracking-widest text-slate-500">
                    <Link href="/euonex" className="hover:text-white transition-colors">Home</Link>
                    <Link href="/euonex/products" className="hover:text-white transition-colors">Products</Link>
                    <a href="#about" className="hover:text-white transition-colors cursor-pointer">About</a>
                    <a href="#contact" className="hover:text-white transition-colors cursor-pointer">Contact</a>
                </div>

                <Link
                    href="/auth/login"
                    className="px-6 py-2.5 bg-white text-black text-sm font-black rounded-full hover:bg-slate-200 transition-all active:scale-95 shadow-xl shadow-white/10"
                >
                    Get Demo
                </Link>
            </div>
        </nav>
    );
}
