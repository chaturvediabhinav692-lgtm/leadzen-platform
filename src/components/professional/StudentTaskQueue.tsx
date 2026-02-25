'use client';

import { Client } from '@/lib/mockData';
import { Phone, MessageCircle, Check, Flame, AlertTriangle, Clock } from 'lucide-react';

// Inline badges if imports fail or differ
const LocalInterestBadge = ({ level }: { level: 'HOT' | 'WARM' | 'COLD' }) => {
    if (level === 'HOT') return <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 w-fit"><Flame size={12} className="fill-current" /> HOT</span>;
    if (level === 'WARM') return <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 w-fit"><AlertTriangle size={12} className="fill-current" /> WARM</span>;
    return <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 w-fit"><Clock size={12} /> COLD</span>;
};

interface StudentTaskQueueProps {
    clients: Client[];
    onAssign: (id: string) => void;
    onSnooze: (id: string) => void;
    onWhatsApp: (client: Client) => void;
    onCall: (client: Client) => void;
}

export default function StudentTaskQueue({ clients, onAssign, onWhatsApp, onCall }: StudentTaskQueueProps) {
    const stream = clients.slice(1); // Skip Hero

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-white flex items-center gap-2">
                <Flame className="text-orange-500" size={20} />
                <h3 className="font-bold text-lg text-slate-800">
                    Priority Tasks
                </h3>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{stream.length}</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Interest</th>
                            <th className="px-6 py-4">Lead Details</th>
                            <th className="px-6 py-4 hidden md:table-cell">Last Message</th>
                            <th className="px-6 py-4">Score</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {stream.map(client => (
                            <tr key={client.id} className="hover:bg-slate-50 group transition-colors">
                                <td className="px-6 py-4 align-top">
                                    <LocalInterestBadge level={client.interestLevel} />
                                </td>
                                <td className="px-6 py-4 align-top">
                                    <div className="font-bold text-slate-900 text-base">{client.name}</div>
                                    <div className="text-xs text-slate-500 mt-1 font-medium">{client.category} • {client.location}</div>
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell align-top">
                                    <div className="text-xs text-slate-600 italic max-w-[200px] truncate">
                                        "{client.lastMessage}"
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-1 font-mono">
                                        {new Date(client.lastActivity).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 align-top">
                                    {client.leadScore >= 80 ? (
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded border border-green-200">
                                            Score: {client.leadScore}
                                        </span>
                                    ) : client.leadScore >= 50 ? (
                                        <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded border border-yellow-200">
                                            Score: {client.leadScore}
                                        </span>
                                    ) : (
                                        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded border border-slate-200">
                                            Score: {client.leadScore}
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right align-top">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onWhatsApp(client)}
                                            className="bg-green-50 hover:bg-green-100 text-green-600 p-2 rounded-lg transition-colors border border-green-100"
                                            title="WhatsApp"
                                        >
                                            <MessageCircle size={18} />
                                        </button>
                                        <button
                                            onClick={() => onCall(client)}
                                            className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg transition-colors border border-blue-100"
                                            title="Call"
                                        >
                                            <Phone size={18} />
                                        </button>
                                        <button
                                            onClick={() => onAssign(client.id)}
                                            className="bg-white border border-slate-200 hover:border-green-300 hover:text-green-600 text-slate-400 p-2 rounded-lg transition-colors shadow-sm"
                                            title="Assign to Broker"
                                        >
                                            <Check size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {stream.length === 0 && (
                    <div className="p-8 text-center text-slate-500 italic">No more priority tasks.</div>
                )}
            </div>
        </div>
    );
}
