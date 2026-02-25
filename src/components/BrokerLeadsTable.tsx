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
        <div className="bg-[#111217] rounded-2xl border border-white/5 overflow-hidden font-body">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-black/40 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/5">
                        <tr>
                            <th className="px-6 py-5">Client Name</th>
                            <th className="px-6 py-5">Interest</th>
                            <th className="px-6 py-5">Status</th>
                            <th className="px-6 py-5">Score</th>
                            <th className="px-6 py-5">Activity</th>
                            <th className="px-6 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-white group-hover:text-violet-400 transition-colors">{client.name}</div>
                                    <div className="text-[10px] text-gray-500 font-medium mt-0.5">{client.courseInterest} • {client.phone}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <InterestBadge level={client.interestLevel} />
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={client.status}
                                        onChange={(e) => updateClientStatus(client.id, e.target.value as any)}
                                        className="bg-transparent text-xs font-semibold text-gray-300 outline-none cursor-pointer border border-white/10 rounded-lg px-2 py-1 hover:border-white/20 transition-all"
                                    >
                                        <option value="new" className="bg-[#111217]">New</option>
                                        <option value="hot" className="bg-[#111217]">Hot</option>
                                        <option value="warm" className="bg-[#111217]">Warm</option>
                                        <option value="cold" className="bg-[#111217]">Cold</option>
                                        <option value="assigned" className="bg-[#111217]">Assigned</option>
                                        <option value="converted" className="bg-[#111217]">Converted</option>
                                        <option value="snoozed" className="bg-[#111217]">Snoozed</option>
                                        <option value="rejected" className="bg-[#111217]">Rejected</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <LeadScoreBadge score={client.leadScore} />
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-xs">
                                    {new Date(client.lastActivity).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            className="p-2 text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/10 rounded-xl transition-all active:scale-95"
                                            title="WhatsApp"
                                            onClick={() => alert(`WhatsApp ${client.phone}...`)}
                                        >
                                            <MessageCircle size={14} />
                                        </button>
                                        <button
                                            className="p-2 text-blue-400 hover:bg-blue-500/10 border border-blue-500/10 rounded-xl transition-all active:scale-95"
                                            title="Call Lead"
                                            onClick={() => alert(`Calling ${client.phone}...`)}
                                        >
                                            <Phone size={14} />
                                        </button>
                                        <Link
                                            href={`/client/${client.id}`}
                                            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 rounded-xl transition-all active:scale-95"
                                        >
                                            <ExternalLink size={14} />
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
