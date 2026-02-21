'use client';

import { Phone, ArrowRight, FileText, MessageCircle } from 'lucide-react';

interface QuickActionsProps {
    onCallNext: () => void;
    onWhatsAppQueue: () => void;
    onLogNote: () => void;
}

export default function QuickActions({ onCallNext, onWhatsAppQueue, onLogNote }: QuickActionsProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-[#1f1f1f] px-4 py-3 z-50 shadow-2xl md:pl-64 backdrop-blur-sm bg-opacity-95">
            <div className="max-w-5xl mx-auto flex gap-3 justify-center">
                <button
                    onClick={onCallNext}
                    className="flex-1 max-w-xs bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-indigo-900/50"
                >
                    <Phone size={18} /> Call Next Lead
                </button>
                <button
                    onClick={onWhatsAppQueue}
                    className="flex-1 max-w-xs bg-[#1f1f1f] hover:bg-[#262626] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform border border-[#262626]"
                >
                    <MessageCircle size={18} /> WhatsApp Queue
                </button>
                <button
                    onClick={onLogNote}
                    className="w-12 bg-[#1f1f1f] hover:bg-[#262626] text-slate-400 hover:text-white py-3 rounded-lg font-bold flex items-center justify-center active:scale-95 transition-transform border border-[#262626]"
                    title="Log Note"
                >
                    <FileText size={18} />
                </button>
            </div>
        </div>
    );
}
