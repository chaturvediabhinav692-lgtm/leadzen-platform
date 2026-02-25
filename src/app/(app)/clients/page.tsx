'use client';

import RouteGuard from '@/components/layout/RouteGuard';
import { useStore } from '@/lib/store';
import { Users, UserCheck, UserX } from 'lucide-react';

export default function AdminClientsPage() {
    const { platformClients } = useStore();

    // Stats
    const total = platformClients.length;
    const active = platformClients.filter(c => c.status === 'Active' || c.status === 'Trial').length;
    const inactive = platformClients.filter(c => c.status === 'Churned').length;

    return (
        <RouteGuard>
            <div className="max-w-7xl mx-auto space-y-8 pb-20">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Client Overview</h1>
                    <p className="text-slate-500 mt-1">Manage all coaching centers enrolled in the platform.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Total Clients</p>
                            <p className="text-3xl font-black text-slate-900">{total}</p>
                        </div>
                        <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
                            <Users size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Active</p>
                            <p className="text-3xl font-black text-green-600">{active}</p>
                        </div>
                        <div className="p-3 rounded-full bg-green-50 text-green-600">
                            <UserCheck size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Inactive</p>
                            <p className="text-3xl font-black text-slate-500">{inactive}</p>
                        </div>
                        <div className="p-3 rounded-full bg-slate-100 text-slate-500">
                            <UserX size={24} />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Client Name</th>
                                <th className="px-6 py-4">Plan</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Joined Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {platformClients.map(client => (
                                <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-800">{client.name}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{client.plan}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${client.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                client.status === 'Trial' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {client.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm text-slate-500">{new Date(client.joinedDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </RouteGuard>
    );
}
