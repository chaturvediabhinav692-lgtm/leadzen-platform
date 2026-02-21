'use client';

import { Client } from '@/lib/mockData';
import Link from 'next/link';
import { AlertCircle, Clock } from 'lucide-react';

interface TaskQueueProps {
    clients: Client[];
}

export default function TaskQueue({ clients }: TaskQueueProps) {
    // Urgent: Status 'new' and no activity yet (or minimal)
    const urgentLeads = clients.filter(c => c.status === 'new');

    // Overdue: No activity > 2 days
    const overdueLeads = clients.filter(c =>
        new Date(c.lastActivity).getTime() < Date.now() - (2 * 86400000) &&
        !['converted', 'rejected'].includes(c.status)
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-6">
            <h3 className="font-bold text-lg text-slate-800">Task Queue</h3>

            {/* Urgent Section */}
            <div>
                <h4 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
                    <AlertCircle size={16} /> Urgent Actions (New Leads)
                </h4>
                {urgentLeads.length === 0 ? (
                    <p className="text-sm text-slate-400 italic">No new leads pending.</p>
                ) : (
                    <div className="space-y-2">
                        {urgentLeads.slice(0, 3).map(client => (
                            <div key={client.id} className="bg-red-50 border border-red-100 rounded-lg p-3 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-slate-900">{client.name}</p>
                                    <p className="text-xs text-red-500 font-medium">New Lead • {client.courseInterest}</p>
                                </div>
                                <Link href={`/client/${client.id}`} className="text-xs font-bold text-red-700 hover:underline">
                                    Take Action
                                </Link>
                            </div>
                        ))}
                        {urgentLeads.length > 3 && (
                            <p className="text-xs text-center text-slate-500" suppressHydrationWarning>+{urgentLeads.length - 3} more new leads</p>
                        )}
                    </div>
                )}
            </div>

            {/* Overdue Section */}
            <div>
                <h4 className="text-sm font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                    <Clock size={16} /> Needs Attention (Inactive {'>'} 2 Days)
                </h4>
                {overdueLeads.length === 0 ? (
                    <p className="text-sm text-slate-400 italic">All caught up!</p>
                ) : (
                    <div className="space-y-2">
                        {overdueLeads.slice(0, 3).map(client => (
                            <div key={client.id} className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-slate-900">{client.name}</p>
                                    <p className="text-xs text-slate-500">Last: {new Date(client.lastActivity).toLocaleDateString()}</p>
                                </div>
                                <Link href={`/client/${client.id}`} className="text-xs font-bold text-yellow-700 hover:underline">
                                    Follow Up
                                </Link>
                            </div>
                        ))}
                        {overdueLeads.length > 3 && (
                            <p className="text-xs text-center text-slate-500" suppressHydrationWarning>+{overdueLeads.length - 3} more overdue</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
