'use client';

import RouteGuard from '@/components/layout/RouteGuard';
import { useStore } from '@/lib/store';
import { Users, UserCheck, UserX, LayoutDashboard } from 'lucide-react';
import StatsCard from '@/components/StatsCard';

export default function AdminClientsPage() {
    const { platformClients } = useStore();

    // Stats
    const total = platformClients.length;
    const active = platformClients.filter(c => c.status === 'Active' || c.status === 'Trial').length;
    const inactive = platformClients.filter(c => c.status === 'Churned').length;

    return (
        <RouteGuard>
            <div className="max-w-7xl mx-auto space-y-8 pb-20 font-body">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Client Overview</h1>
                    <p className="text-gray-500">Manage all business centers enrolled in the platform.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard
                        label="Total Clients"
                        value={total}
                        icon={Users}
                        color="purple"
                    />
                    <StatsCard
                        label="Active Centers"
                        value={active}
                        icon={UserCheck}
                        color="green"
                    />
                    <StatsCard
                        label="Churned"
                        value={inactive}
                        icon={UserX}
                        color="red"
                    />
                </div>

                {/* Table Section */}
                <div className="bg-[#111217] rounded-2xl border border-white/5 overflow-hidden">
                    <div className="bg-black/40 px-6 py-4 border-b border-white/5 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                            <LayoutDashboard className="text-accent" size={16} />
                        </div>
                        <h2 className="text-sm font-bold text-white uppercase tracking-widest">Platform Roster</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/20 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-5">Client Name</th>
                                    <th className="px-6 py-4">Subscription Plan</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Enrollment Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {platformClients.map(client => (
                                    <tr key={client.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white group-hover:text-violet-400 transition-colors">{client.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-400 text-sm">{client.plan}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                client.status === 'Trial' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                    'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                }`}>
                                                {client.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm text-gray-500">
                                            {new Date(client.joinedDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </RouteGuard>
    );
}
