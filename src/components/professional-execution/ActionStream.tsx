'use client';

import { Client } from '@/lib/mockData';
import { Phone, MessageCircle, Check, Clock, Flame, AlertTriangle } from 'lucide-react';

interface ActionStreamProps {
    clients: Client[];
    onMarkDone: (id: string) => void;
    onSnooze: (id: string) => void;
}

export default function ActionStream({ clients, onMarkDone, onSnooze }: ActionStreamProps) {
    // 1. Sort by Priority (hot > warm > cold) then Recency
    const sortedClients = [...clients]
        .filter(c => c.stage === 'active')
        .sort((a, b) => {
            const priorityScore: Record<string, number> = { hot: 3, warm: 2, cold: 1, new: 1 };
            const diff = (priorityScore[b.status] || 0) - (priorityScore[a.status] || 0);
            if (diff !== 0) return diff;
            return b.lastActivityAt - a.lastActivityAt;
        });

    // Remove the very first one (Hero Client)
    const stream = sortedClients.slice(1);

    // 2. Grouping (Lowercase to match ClientStatus)
    const groups = {
        hot: stream.filter(c => c.status === 'hot'),
        warm: stream.filter(c => c.status === 'warm'),
        cold: stream.filter(c => c.status === 'cold'),
    };

    // Helper for time badge
    const getTimeBadge = (timestamp: number) => {
        const mins = Math.floor((Date.now() - timestamp) / 60000);
        if (mins < 5) return { text: 'Active', color: 'text-emerald-400', dot: 'bg-emerald-500' };
        if (mins < 15) return { text: `${mins}m ago`, color: 'text-gray-500', dot: 'bg-gray-700' };
        if (mins < 30) return { text: 'Waiting', color: 'text-amber-400', dot: 'bg-amber-500' };
        return { text: 'Delayed', color: 'text-rose-400', dot: 'bg-rose-500' };
    };

    const ClientRow = ({ client }: { client: Client }) => {
        const timeBadge = getTimeBadge(client.lastActivityAt);
        const isHot = client.status === 'hot';
        const isWarm = client.status === 'warm';

        const handleWhatsApp = () => {
            const message = encodeURIComponent(client.lastMessage || "Hi, checking in.");
            window.open(`https://wa.me/${client.phone.replace(/\s+/g, '')}?text=${message}`, '_blank');
        };

        const handleCall = () => {
            window.location.href = `tel:${client.phone.replace(/\s+/g, '')}`;
        };

        return (
            <div className={`p-5 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group border-l-2 transition-all ${isHot ? 'border-rose-500 bg-rose-500/[0.02]' : isWarm ? 'border-amber-500 bg-amber-500/[0.02]' : 'border-white/5'}`}>
                <div className="flex items-center gap-5 min-w-0 pr-4">
                    {/* Urgency Icon */}
                    <div className="flex-shrink-0">
                        {isHot ? (
                            <div className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl border border-rose-500/20">
                                <Flame size={18} className="animate-pulse" />
                            </div>
                        ) : isWarm ? (
                            <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                                <AlertTriangle size={18} />
                            </div>
                        ) : (
                            <div className="p-2.5 bg-white/5 text-gray-500 rounded-xl border border-white/10">
                                <Clock size={18} />
                            </div>
                        )}
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-white truncate text-base">{client.name}</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${isHot ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : isWarm ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                                {client.status}
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 truncate max-w-[300px] md:max-w-md">
                            <span className="font-semibold text-gray-300">{client.source}:</span> "{client.lastMessage}"
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${timeBadge.color} bg-black/20 px-3 py-1.5 rounded-lg border border-white/5 shadow-sm`} suppressHydrationWarning>
                        <div className={`w-1.5 h-1.5 rounded-full ${timeBadge.dot} ${timeBadge.text === 'Active' ? 'animate-pulse' : ''}`} />
                        {timeBadge.text}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleWhatsApp}
                            className={`p-2.5 rounded-xl border transition-all ${isHot ? 'bg-emerald-500 text-white border-emerald-400 hover:opacity-90' : 'bg-white/5 text-emerald-400 border-white/10 hover:bg-emerald-500/10'}`}
                            title="WhatsApp"
                        >
                            <MessageCircle size={18} className={isHot ? 'fill-white' : ''} />
                        </button>
                        <button
                            onClick={handleCall}
                            className="p-2.5 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                            title="Call"
                        >
                            <Phone size={18} />
                        </button>
                        <button
                            onClick={() => onMarkDone(client.id)}
                            className="p-2.5 text-gray-600 hover:text-emerald-400 transition-colors"
                            title="Complete"
                        >
                            <Check size={18} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8 font-body">
            {/* HOT SECTION */}
            {groups.hot.length > 0 && (
                <div className="bg-[#111217] rounded-2xl border border-white/5 overflow-hidden shadow-2xl shadow-rose-500/5">
                    <div className="bg-rose-500/[0.03] px-5 py-3 border-b border-white/5 flex justify-between items-center">
                        <h3 className="font-bold text-rose-400 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2.5">
                            <Flame size={14} className="animate-pulse" /> Urgent Priority
                        </h3>
                        <span className="bg-rose-500/20 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-500/20">{groups.hot.length}</span>
                    </div>
                    <div className="divide-y divide-white/5">
                        {groups.hot.map(c => <ClientRow key={c.id} client={c} />)}
                    </div>
                </div>
            )}

            {/* WARM SECTION */}
            {groups.warm.length > 0 && (
                <div className="bg-[#111217] rounded-2xl border border-white/5 overflow-hidden shadow-xl shadow-amber-500/5">
                    <div className="bg-amber-500/[0.03] px-5 py-3 border-b border-white/5 flex justify-between items-center">
                        <h3 className="font-bold text-amber-400 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2.5">
                            <Clock size={14} /> Active Follow-Up
                        </h3>
                        <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/20">{groups.warm.length}</span>
                    </div>
                    <div className="divide-y divide-white/5">
                        {groups.warm.map(c => <ClientRow key={c.id} client={c} />)}
                    </div>
                </div>
            )}

            {/* COLD SECTION */}
            {groups.cold.length > 0 && (
                <div className="bg-[#111217] rounded-2xl border border-white/5 overflow-hidden opacity-60 hover:opacity-100 transition-all group">
                    <div className="bg-black/20 px-5 py-3 border-b border-white/5 flex justify-between items-center">
                        <h3 className="font-bold text-gray-500 text-[10px] uppercase tracking-[0.2em] group-hover:text-gray-400 transition-colors">
                            General Queue
                        </h3>
                        <span className="bg-white/5 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10 group-hover:text-gray-400 group-hover:bg-white/10 transition-all">{groups.cold.length}</span>
                    </div>
                    <div className="divide-y divide-white/5">
                        {groups.cold.map(c => <ClientRow key={c.id} client={c} />)}
                    </div>
                </div>
            )}
        </div>
    );
}
