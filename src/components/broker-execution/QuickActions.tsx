'use client';

import { Phone, ArrowRight, FileText, MessageCircle } from 'lucide-react';

interface QuickActionsProps {
    onCallNext: () => void;
    onWhatsAppQueue: () => void;
    onLogNote: () => void;
}

export default function QuickActions({ onCallNext, onWhatsAppQueue, onLogNote }: QuickActionsProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0b0c10]/95 border-t border-white/5 px-6 py-4 z-50 backdrop-blur-xl md:pl-72 font-body">
            <div className="max-w-4xl mx-auto flex gap-4">
                <button
                    onClick={onCallNext}
                    className="flex-1 max-w-sm bg-accent text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-lg shadow-accent/25 hover:opacity-90"
                >
                    <div className="p-1.5 bg-white/20 rounded-lg">
                        <Phone size={18} className="fill-white" />
                    </div>
                    <span>Call Next Priority</span>
                </button>

                <button
                    onClick={onWhatsAppQueue}
                    className="flex-1 max-w-sm bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-all border border-white/10"
                >
                    <MessageCircle size={20} className="text-emerald-400" />
                    <span>WhatsApp Queue</span>
                </button>

                <button
                    onClick={onLogNote}
                    className="w-14 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white py-4 rounded-2xl font-bold flex items-center justify-center active:scale-[0.98] transition-all border border-white/10"
                    title="Log Note"
                >
                    <FileText size={20} />
                </button>
            </div>
        </div>
    );
}
