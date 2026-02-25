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
        <div className="bg-[#111217] rounded-2xl border border-white/5 p-16 text-center font-body">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-gray-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Queue Cleared</h3>
            <p className="text-gray-500 max-w-xs mx-auto">No pending leads currently require immediate attention.</p>
        </div>
    );

    const minsAgo = Math.floor((Date.now() - bestLead.lastActivityAt) / 60000);
    const timeDisplay = minsAgo < 60 ? `${minsAgo}m ago` : new Date(bestLead.lastActivityAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
        <div className="bg-[#111217] rounded-2xl border border-white/5 overflow-hidden relative group font-body">
            {/* Priority Indicator */}
            <div className="absolute top-0 right-0 px-4 py-2 bg-rose-500/10 border-b border-l border-rose-500/20 rounded-bl-2xl text-rose-400 font-bold text-[10px] tracking-[0.2em] uppercase flex items-center gap-2.5 z-10">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                Highest Priority
            </div>

            <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">{bestLead.name}</h2>
                        <div className="flex items-center gap-3 text-sm font-semibold">
                            <span className="px-3 py-1 bg-rose-500/10 text-rose-400 rounded-full border border-rose-500/20 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                                <Flame size={12} className="fill-current" /> {bestLead.status}
                            </span>
                            <span className="text-white/10">•</span>
                            <span className="text-gray-400">{bestLead.courseInterest}</span>
                            <span className="text-white/10">•</span>
                            <span className="text-gray-500 font-normal">{bestLead.location}</span>
                        </div>
                    </div>

                    <div className={`p-6 rounded-2xl border transition-all ${isActiveNow ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/5 border-white/10'}`}>
                        <div className="flex items-center gap-2 mb-3">
                            <Clock size={14} className={isActiveNow ? 'text-emerald-400' : 'text-gray-500'} />
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isActiveNow ? 'text-emerald-400' : 'text-gray-500'}`} suppressHydrationWarning>
                                {isActiveNow ? 'Active Now' : 'Last Message'} • {timeDisplay}
                            </span>
                        </div>
                        <p className="text-white text-xl font-medium leading-relaxed italic line-clamp-3">"{bestLead.lastMessage}"</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 justify-center md:pl-10 border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0">
                    <button
                        onClick={handleWhatsApp}
                        className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-emerald-500/20"
                    >
                        <MessageCircle size={24} className="fill-white" />
                        <span>WhatsApp</span>
                    </button>

                    <button
                        onClick={handleCall}
                        className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95"
                    >
                        <Phone size={20} />
                        <span>Call Record</span>
                    </button>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <button
                            onClick={() => onSnooze(bestLead.id)}
                            className="py-3 px-4 bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                        >
                            <Clock size={14} /> Snooze
                        </button>
                        <button
                            onClick={() => onMarkDone(bestLead.id)}
                            className="py-3 px-4 bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                        >
                            <CheckCircle size={14} /> Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
