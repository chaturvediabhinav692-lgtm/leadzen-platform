'use client';

import { Client } from '@/lib/mockData';
import { useStore } from '@/lib/store';
import { Phone, Check, MessageCircle } from 'lucide-react';
import InterestBadge from '../InterestBadge';
import LeadScoreBadge from '../LeadScoreBadge';

interface TaskQueueProps {
    clients: Client[];
}

export default function TaskQueue({ clients }: TaskQueueProps) {
    const { updateClientStatus } = useStore();

    const getPriorityScore = (client: Client): number => {
        let score = 0;
        if (client.interestLevel === 'HOT') score += 10;
        if (client.interestLevel === 'WARM') score += 5;
        if (client.status === 'new') score += 3;
        if (client.status === 'interested') score += 2;
        return score;
    };

    const prioritizedClients = clients
        .filter(c => c.status !== 'converted' && c.status !== 'rejected')
        .sort((a, b) => getPriorityScore(b) - getPriorityScore(a));

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    🔥 Priority Tasks
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">{prioritizedClients.length}</span>
                </h3>
            </div>

            <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Interest</th>
                        <th className="px-6 py-4">Lead Details</th>
                        <th className="px-6 py-4 hidden md:table-cell">Last Message</th>
                        <th className="px-6 py-4">Score</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {prioritizedClients.map(client => (
                        <tr key={client.id} className="hover:bg-slate-50 group transition-colors">
                            <td className="px-6 py-4">
                                <InterestBadge level={client.interestLevel} />
                            </td>
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-900 text-base">{client.name}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{client.courseInterest} • {client.location}</div>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                <div className="text-xs text-slate-600 italic max-w-[200px] truncate">
                                    "{client.lastMessage}"
                                </div>
                                <div className="text-[10px] text-slate-400 mt-1">
                                    {new Date(client.lastActivity).toLocaleDateString()}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <LeadScoreBadge score={client.leadScore} />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-3">
                                    <button
                                        onClick={() => alert(`WhatsApp ${client.name}...`)}
                                        className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg shadow-sm"
                                        title="Send WhatsApp"
                                    >
                                        <MessageCircle size={18} />
                                    </button>
                                    <button
                                        onClick={() => alert(`Calling ${client.name}...`)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow-sm"
                                        title="Call Now"
                                    >
                                        <Phone size={18} />
                                    </button>
                                    <button
                                        onClick={() => updateClientStatus(client.id, 'converted')}
                                        className="bg-white border border-slate-200 hover:bg-green-50 hover:border-green-200 hover:text-green-600 text-slate-600 p-2 rounded-lg"
                                        title="Mark Converted"
                                    >
                                        <Check size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
