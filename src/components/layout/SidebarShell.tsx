'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LucideIcon, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { useAuth } from '@/context/AuthContext';

interface NavItem {
    name: string;
    href: string;
    icon: LucideIcon;
}

interface SidebarShellProps {
    navItems: NavItem[];
    // Legacy props kept for compatibility but ignored in favor of dynamic logic
    roleLabel?: string;
    roleEmail?: string;
    roleBadge?: string;
}

export default function SidebarShell({ navItems }: SidebarShellProps) {
    const { logout } = useAuth();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        setRole(localStorage.getItem("leadflow_role"));
    }, []);

    const user =
        role === "coaching"
            ? {
                name: "Business Manager",
                email: "manager@leadzen.com",
                initials: "BM",
            }
            : {
                name: "Service Professional",
                email: "user@leadzen.com",
                initials: "SP",
            };

    return (
        <>
            {/* Mobile Menu Button - "Hamburger" */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 text-slate-800 bg-white/80 backdrop-blur-sm rounded-md shadow-sm border border-slate-200"
                onClick={() => setIsOpen(true)}
            >
                <span className="text-2xl leading-none">☰</span>
            </button>

            {/* Sidebar Container */}
            <aside
                className={clsx(
                    "fixed inset-y-0 left-0 z-50 w-[260px] bg-[#0a0a0a] text-white border-r border-[#1f1f1f] transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen md:w-64",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full relative">
                    {/* Close Button for Mobile */}
                    <button
                        className="absolute top-4 right-4 md:hidden p-2 text-slate-400 hover:text-white"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="text-xl">✕</span>
                    </button>

                    <div className="p-6 border-b border-[#1f1f1f]">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                            Leadzen
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">Automation Platform</p>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={clsx(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                        isActive
                                            ? "bg-[#1f1f1f] text-white border border-[#262626]"
                                            : "text-slate-400 hover:bg-[#111111] hover:text-white"
                                    )}
                                >
                                    <item.icon size={20} />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-[#1f1f1f] space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-[10px] font-black border border-purple-500/20 text-purple-400">
                                {user.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-slate-200 truncate">{user.name}</p>
                                <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => logout()}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/5 hover:bg-red-500/10 text-red-400 border border-red-500/10 rounded-xl transition-all active:scale-[0.98] group"
                        >
                            <LogOut size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Logout System</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
