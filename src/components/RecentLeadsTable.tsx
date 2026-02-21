'use client';

import { useStore } from '@/lib/store';
import Link from 'next/link';
import StatusBadge from './StatusBadge';
import { ArrowRight } from 'lucide-react';

export default function RecentLeadsTable() {
    const { clients } = useStore();

    // Get 5 most recent clients (mock logic: assuming the array is ordered or we sort by ID/date)
    // In our generator, higher ID = newer (c1...c25). Or use created date if we had it.
    // We'll just slice the last 5 since we push them in order.
    const recentClients = [...clients].reverse().slice(0, 5);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <h3 className="font-bold text-lg text-slate-800">Recent Leads</h3>
                <Link href="/clients" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    View All <ArrowRight size={16} />
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {recentClients.map(client => (
                            <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{client.name}</td>
                                <td className="px-6 py-4 text-slate-500">{client.category}</td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={client.status} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        href={`/client/${client.id}`}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
