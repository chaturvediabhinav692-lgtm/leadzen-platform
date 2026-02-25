'use client';

import Sidebar from '@/components/Sidebar';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
                {children}
            </main>
        </div>
    );
}
