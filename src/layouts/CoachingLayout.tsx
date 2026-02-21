'use client';

import { ReactNode } from 'react';

interface CoachingLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
}

export default function CoachingLayout({ children, title, subtitle }: CoachingLayoutProps) {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="border-b border-slate-200 pb-5">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
                {subtitle && <p className="text-slate-500 mt-2 text-lg">{subtitle}</p>}
            </div>
            <div className="space-y-8">
                {children}
            </div>
        </div>
    );
}
