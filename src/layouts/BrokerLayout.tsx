'use client';

import { ReactNode } from 'react';

interface BrokerLayoutProps {
    children: ReactNode;
}

export default function BrokerLayout({ children }: BrokerLayoutProps) {
    return (
        <div className="max-w-7xl mx-auto h-full flex flex-col gap-4 p-4 md:p-8">
            {/* Restored Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 -mx-6 -mt-8 mb-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 uppercase tracking-wide">Student Dashboard</h1>
                    <p className="text-xs text-slate-500">Execution Mode</p>
                </div>
                <div className="flex gap-2">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> LIVE
                    </span>
                </div>
            </div>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
}
