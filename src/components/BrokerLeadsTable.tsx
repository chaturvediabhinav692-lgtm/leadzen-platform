'use client';

import { Client } from '@/lib/mockData';
import { useStore } from '@/lib/store';
import { Phone, Calendar, StickyNote, ExternalLink, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import LeadScoreBadge from './LeadScoreBadge';
import InterestBadge from './InterestBadge';

interface BrokerLeadsTableProps {
    clients: Client[];
}

export default function BrokerLeadsTable({ clients }: BrokerLeadsTableProps) {
    const { updateClientStatus } = useStore();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4">Client Name</th>
                            <th className="px-6 py-4">Interest</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Score</th>
                            <th className="px-6 py-4">Last Activity</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900">{client.name}</div>
                                    <div className="text-xs text-slate-500">{client.courseInterest} • {client.phone}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <InterestBadge level={client.interestLevel} />
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={client.status}
                                        onChange={(e) => updateClientStatus(client.id, e.target.value as any)}
                                        className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer hover:underline"
                                    >
                                        <option value="new">New</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="interested">Interested</option>
                                        <option value="converted">Converted</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <LeadScoreBadge score={client.leadScore} />
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-sm">
                                    {new Date(client.lastActivity).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                                            title="WhatsApp"
                                            onClick={() => alert(`WhatsApp ${client.phone}...`)}
                                        >
                                            <MessageCircle size={16} />
                                        </button>
                                        <button
                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                            title="Call Lead"
                                            onClick={() => alert(`Calling ${client.phone}...`)}
                                        >
                                            <Phone size={16} />
                                        </button>
                                        <Link
                                            href={`/client/${client.id}`}
                                            className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-blue-600 ml-2"
                                        >
                                            View <ExternalLink size={12} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
