'use client';

import { Client } from '@/lib/mockData';
import { Phone, MessageCircle, Clock, BellOff, CheckCircle, Flame } from 'lucide-react';

interface HeroClientProps {
    clients: Client[];
    onMarkDone: (id: string) => void;
    onSnooze: (id: string) => void;
}

export default function HeroClient({ clients, onMarkDone, onSnooze }: HeroClientProps) {
    // Strict Priority Logic: hot > warm > cold, then Recency
    const sortedClients = [...clients]
        .filter(c => c.stage === 'active')
        .sort((a, b) => {
            const priorityScore: Record<string, number> = { hot: 3, warm: 2, cold: 1, new: 1 };
            const diff = (priorityScore[b.status] || 0) - (priorityScore[a.status] || 0);
            if (diff !== 0) return diff;
            return b.lastActivityAt - a.lastActivityAt;
        });

    const bestLead = sortedClients[0]; // Absolute top priority

    if (!bestLead) return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">🎉 All caught up!</h3>
            <p className="text-slate-500">No pending leads in your queue.</p>
        </div>
    );

    const lastMsgTime = new Date(bestLead.lastActivity);
    const minsAgo = Math.floor((Date.now() - bestLead.lastActivityAt) / 60000);
    const timeDisplay = minsAgo < 60 ? `${minsAgo} min ago` : new Date(bestLead.lastActivityAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isActiveNow = minsAgo < 5;

    // Action Handlers
    const handleWhatsApp = () => {
        const message = encodeURIComponent(bestLead.lastMessage || "Hi, checking in regarding your property interest.");
        window.open(`https://wa.me/${bestLead.phone.replace(/\s+/g, '')}?text=${message}`, '_blank');
    };

    const handleCall = () => {
        window.location.href = `tel:${bestLead.phone.replace(/\s+/g, '')}`;
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl border-l-[12px] border-red-600 overflow-hidden relative group transform hover:scale-[1.01] transition-transform duration-300">
            {/* Urgent Badge */}
            <div className="absolute top-0 right-0 p-3 bg-red-600 rounded-bl-xl text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 z-10 shadow-lg">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                HIGHEST PRIORITY
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">{bestLead.name}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-bold text-sm flex items-center gap-1">
                            <Flame size={14} className="fill-current" /> {bestLead.status.toUpperCase()}
                        </span>
                        <span className="text-slate-400 text-xl font-light">|</span>
                        <span className="text-slate-600 text-lg font-medium">{bestLead.courseInterest}</span>

                        <span className="text-slate-400 text-sm">in {bestLead.location}</span>
                    </div>

                    <div className={`mt-6 p-5 rounded-xl border-2 relative ${isActiveNow ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-100'}`}>
                        <div className={`absolute -top-3 left-6 text-xs font-bold px-3 py-0.5 rounded-full border shadow-sm ${isActiveNow ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-200 text-slate-600 border-slate-300'}`} suppressHydrationWarning>
                            {isActiveNow ? 'ACTIVE NOW' : 'LAST MESSAGE'} • {timeDisplay}
                        </div>

                        <p className="text-slate-800 text-xl font-medium leading-relaxed italic">"{bestLead.lastMessage}"</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 justify-center md:pl-8 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100">
                    <button onClick={handleWhatsApp} className="w-full py-5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-2xl flex items-center justify-center gap-3 shadow-xl hover:shadow-green-500/40 transition-all active:scale-95 group">
                        <MessageCircle size={32} className="fill-current group-hover:scale-110 transition-transform" />
                        <span>WhatsApp</span>
                    </button>

                    <button onClick={handleCall} className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all">
                        <Phone size={24} /> Call Client
                    </button>

                    <div className="grid grid-cols-2 gap-3 mt-2">
                        <button onClick={() => onSnooze(bestLead.id)} className="py-2 text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 rounded-lg">
                            <Clock size={16} /> Snooze 10m
                        </button>
                        <button onClick={() => onMarkDone(bestLead.id)} className="py-2 text-indigo-600 hover:text-indigo-700 text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 rounded-lg">
                            <CheckCircle size={16} /> Mark Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
