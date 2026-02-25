'use client';

import { Phone, ArrowRight, BookOpen } from 'lucide-react';

export default function QuickActionBar() {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md text-white p-2 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/10 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-colors font-medium text-sm">
                <Phone size={16} className="text-green-400" />
                Call Next Lead
            </button>
            <div className="w-px h-6 bg-white/20" />
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-colors font-medium text-sm">
                <ArrowRight size={16} className="text-blue-400" />
                Next Follow-up
            </button>
            <div className="w-px h-6 bg-white/20" />
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-colors font-medium text-sm">
                <BookOpen size={16} className="text-yellow-400" />
                Log Note
            </button>
        </div>
    );
}
