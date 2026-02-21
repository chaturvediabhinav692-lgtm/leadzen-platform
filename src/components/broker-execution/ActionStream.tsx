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
        if (mins < 5) return { text: 'Active Now', color: 'text-green-600', dot: 'bg-green-500' };
        if (mins < 15) return { text: `${mins}m ago`, color: 'text-slate-400', dot: 'bg-slate-300' };
        if (mins < 30) return { text: 'Waiting', color: 'text-yellow-600', dot: 'bg-yellow-500' };
        return { text: 'Delayed', color: 'text-red-500', dot: 'bg-red-500' };
    };

    const ClientRow = ({ client }: { client: Client }) => {
        const timeBadge = getTimeBadge(client.lastActivityAt);
        const isHot = client.status === 'hot';

        const handleWhatsApp = () => {
            const message = encodeURIComponent(client.lastMessage || "Hi, checking in.");
            window.open(`https://wa.me/${client.phone.replace(/\s+/g, '')}?text=${message}`, '_blank');
        };

        const handleCall = () => {
            window.location.href = `tel:${client.phone.replace(/\s+/g, '')}`;
        };

        return (
            <div className={`p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group border-l-4 ${isHot ? 'border-red-500 bg-red-50/10' : client.status === 'warm' ? 'border-yellow-400' : 'border-slate-300'}`}>
                <div className="flex items-center gap-4 min-w-0 pr-4">
                    {/* Urgency Icon */}
                    <div className="flex-shrink-0">
                        {isHot ? <div className="p-2 bg-red-100 text-red-600 rounded-full animate-pulse"><Flame size={18} /></div> :
                            client.status === 'warm' ? <div className="p-2 bg-yellow-100 text-yellow-600 rounded-full"><AlertTriangle size={18} /></div> :
                                <div className="p-2 bg-slate-100 text-slate-400 rounded-full"><Clock size={18} /></div>}
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-bold text-slate-900 truncate text-base">{client.name}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${isHot ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'}`}>
                                {client.status}
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 truncate max-w-[300px] md:max-w-md">
                            <span className="font-medium text-slate-700">{client.source}:</span> "{client.lastMessage}"
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                    <div className={`flex items-center gap-1.5 text-xs font-medium ${timeBadge.color} bg-white px-2 py-1 rounded border border-slate-100 shadow-sm`} suppressHydrationWarning>
                        <div className={`w-1.5 h-1.5 rounded-full ${timeBadge.dot} ${timeBadge.text === 'Active Now' ? 'animate-pulse' : ''}`} />
                        {timeBadge.text}
                    </div>

                    <div className="flex items-center gap-1 opacity-100">
                        <button onClick={handleWhatsApp} className={`p-3 rounded-xl transition-all shadow-sm ${isHot ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-200' : 'bg-green-50 text-green-600'}`} title="WhatsApp Lead">
                            <MessageCircle size={isHot ? 20 : 18} />
                        </button>
                        <button onClick={handleCall} className={`p-3 rounded-xl transition-all shadow-sm ${isHot ? 'bg-slate-800 text-white hover:bg-slate-900' : 'bg-slate-50 text-slate-600'}`} title="Call Lead">
                            <Phone size={isHot ? 20 : 18} />
                        </button>
                        {/* Done button */}
                        <button onClick={() => onMarkDone(client.id)} className="p-3 text-slate-300 hover:text-green-600 transition-colors" title="Mark Converted">
                            <Check size={18} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* HOT SECTION */}
            {groups.hot.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg shadow-red-100/50 border border-red-100 overflow-hidden">
                    <div className="bg-red-50/50 px-4 py-2 border-b border-red-100 flex justify-between items-center">
                        <h3 className="font-bold text-red-700 text-xs uppercase tracking-widest flex items-center gap-2">
                            <Flame size={14} /> Urgent Priority
                        </h3>
                        <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{groups.hot.length}</span>
                    </div>
                    <div className="divide-y divide-red-50">
                        {groups.hot.map(c => <ClientRow key={c.id} client={c} />)}
                    </div>
                </div>
            )}

            {/* WARM SECTION */}
            {groups.warm.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden opacity-95">
                    <div className="bg-yellow-50/50 px-4 py-2 border-b border-yellow-100 flex justify-between items-center">
                        <h3 className="font-bold text-yellow-700 text-xs uppercase tracking-widest flex items-center gap-2">
                            Follow Up
                        </h3>
                        <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{groups.warm.length}</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {groups.warm.map(c => <ClientRow key={c.id} client={c} />)}
                    </div>
                </div>
            )}

            {/* COLD SECTION */}
            {groups.cold.length > 0 && (
                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden opacity-70 hover:opacity-100 transition-opacity">
                    <div className="px-4 py-2 border-b border-slate-200">
                        <h3 className="font-bold text-slate-500 text-xs uppercase tracking-widest">Low Priority</h3>
                    </div>
                    <div className="divide-y divide-slate-200">
                        {groups.cold.map(c => <ClientRow key={c.id} client={c} />)}
                    </div>
                </div>
            )}
        </div>
    );
}
