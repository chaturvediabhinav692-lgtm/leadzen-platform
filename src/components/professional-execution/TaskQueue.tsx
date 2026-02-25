'use client';

import { Client } from '@/lib/mockData';
import { Phone, MessageCircle, Check } from 'lucide-react';

interface TaskQueueProps {
    clients: Client[];
}

export default function TaskQueue({ clients }: TaskQueueProps) {
    const sortedClients = [...clients].sort((a, b) => b.leadScore - a.leadScore);

    const grouped = {
        HOT: sortedClients.filter(c => c.interestLevel === 'HOT' && c.status !== 'converted'),
        WARM: sortedClients.filter(c => c.interestLevel === 'WARM' && c.status !== 'converted'),
        COLD: sortedClients.filter(c => c.interestLevel === 'COLD' && c.status !== 'converted'),
    };

    const QueueRow = ({ client }: { client: Client }) => (
        <div className="p-3 flex items-center justify-between hover:bg-slate-50 group border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm truncate">{client.name}</span>
                        <span className="text-xs text-slate-400 font-mono hidden sm:inline" suppressHydrationWarning>{new Date(client.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>

                    </div>
                    <p className="text-xs text-slate-500 truncate max-w-[200px] sm:max-w-md">"{client.lastMessage}"</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span className="font-bold text-slate-300 text-sm">{client.leadScore}</span>
                <div className="flex items-center gap-1">
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded"><MessageCircle size={16} /></button>
                    <button className="p-2 text-slate-600 hover:bg-slate-100 rounded"><Phone size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded"><Check size={16} /></button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white border2 border-slate-200 rounded-xl overflow-hidden shadow-sm">
            {grouped.HOT.length > 0 && (
                <div>
                    <div className="bg-red-50 px-4 py-2 border-l-4 border-red-500 text-red-700 font-bold text-xs uppercase tracking-wider">
                        HOT Priority ({grouped.HOT.length})
                    </div>
                    {grouped.HOT.map(c => <QueueRow key={c.id} client={c} />)}
                </div>
            )}

            {grouped.WARM.length > 0 && (
                <div>
                    <div className="bg-yellow-50 px-4 py-2 border-l-4 border-yellow-500 text-yellow-700 font-bold text-xs uppercase tracking-wider">
                        Warm Leads ({grouped.WARM.length})
                    </div>
                    {grouped.WARM.map(c => <QueueRow key={c.id} client={c} />)}
                </div>
            )}

            {grouped.COLD.length > 0 && (
                <div>
                    <div className="bg-slate-50 px-4 py-2 border-l-4 border-slate-300 text-slate-500 font-bold text-xs uppercase tracking-wider">
                        Cold ({grouped.COLD.length})
                    </div>
                    {grouped.COLD.map(c => <QueueRow key={c.id} client={c} />)}
                </div>
            )}
        </div>
    );
}
