'use client';

import { useStore } from '@/lib/store';
import StatsCard from '@/components/StatsCard';
import StatusBadge from '@/components/StatusBadge';
import DailyFollowUps from '@/components/DailyFollowUps';
import Link from 'next/link';
import { Users, CheckCircle, Clock, TrendingUp, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function ProfessionalDashboard() {
    const { clients, brokers } = useStore();
    // Simulating logged-in broker (First one)
    const [currentBrokerId, setCurrentBrokerId] = useState(brokers[0]?.id || 'b1');

    const assignedClients = clients.filter(c => c.assignedBrokerId === currentBrokerId);
    const totalAssigned = assignedClients.length;
    const contactedCount = assignedClients.filter(c => c.status === 'contacted').length;
    const interestedCount = assignedClients.filter(c => c.status === 'interested').length;
    const convertedCount = assignedClients.filter(c => c.status === 'converted').length;

    // Mock logic for "Today's Follow-ups": Clients who are 'contacted' or 'interested' but not converted/rejected
    const followUpLeads = assignedClients.filter(c => ['contacted', 'interested'].includes(c.status)).slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Professional Dashboard</h2>
                    <p className="text-slate-500">
                        Viewing as: <span className="font-semibold text-slate-800">{brokers.find(b => b.id === currentBrokerId)?.name}</span>
                    </p>
                </div>

                {/* User Switcher for Prototype */}
                <select
                    className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={currentBrokerId}
                    onChange={(e) => setCurrentBrokerId(e.target.value)}
                >
                    {brokers.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    label="My Leads"
                    value={totalAssigned}
                    icon={Users}
                    color="yellow"
                />
                <StatsCard
                    label="Contacted"
                    value={contactedCount}
                    icon={CheckCircle}
                    color="purple"
                />
                <StatsCard
                    label="Interested"
                    value={interestedCount}
                    icon={TrendingUp}
                    color="yellow"
                />
                <StatsCard
                    label="Converted"
                    value={convertedCount}
                    icon={CheckCircle}
                    color="green"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="font-bold text-lg text-slate-800">Assigned Clients</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {assignedClients.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500">No leads assigned.</td>
                                    </tr>
                                ) : (
                                    assignedClients.slice(0, 8).map(client => (
                                        <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-900">{client.name}</td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={client.status} />
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{client.category}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/client/${client.id}`}
                                                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                                                >
                                                    View <ExternalLink size={12} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <DailyFollowUps clients={followUpLeads} />
                </div>
            </div>
        </div>
    );
}
