"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black py-20 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-2">
                        <Link href="/euonex" className="flex items-center gap-2 mb-2 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center shadow-lg logo-glow transition-transform group-hover:scale-105">
                                <span className="text-white font-bold text-xs">E</span>
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">Euonex</span>
                        </Link>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-6 ml-1">
                            Global Infrastructure
                        </p>
                        <p className="text-slate-500 max-w-sm leading-relaxed text-sm">
                            A Product by Euonex. We build high-performance, automation-driven systems for businesses that demand excellence and scale.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-slate-500 text-sm font-medium">
                            <li><Link href="/euonex/products" className="hover:text-white transition-colors">Products</Link></li>
                            <li><Link href="/euonex/products/leadflow" className="hover:text-white transition-colors">Leadflow</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-slate-500 text-sm font-medium">
                            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-slate-600 text-xs font-bold uppercase tracking-[0.2em]">
                    <span>© 2026 Euonex Systems Inc.</span>
                    <div className="flex gap-8 mt-6 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                        <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
