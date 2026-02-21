'use client';

import { useStore } from '@/lib/store';
import { AlertCircle, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MissedOpportunities() {
    const { clients } = useStore();

    // Logic: Leads with no activity for > 48h OR New leads assigned but not contacted for > 24h
    const neglectedLeads = clients.filter(c => {
        const lastActive = new Date(c.lastActivity).getTime();
        const hoursSinceActive = (Date.now() - lastActive) / 3600000;

        // Status specific rules
        if (c.status === 'new' && hoursSinceActive > 24) return true;
        if (['contacted', 'interested'].includes(c.status) && hoursSinceActive > 48) return true;

        return false;
    }).sort((a, b) => new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime())
        .slice(0, 3); // Top 3 worst offenders

    if (neglectedLeads.length === 0) return null;

    return (
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-red-800 flex items-center gap-2">
                    <AlertCircle className="text-red-600" size={20} />
                    Missed Opportunities
                </h3>
                <span className="text-xs font-semibold text-red-600 bg-white px-2 py-1 rounded-full border border-red-100">
                    Action Required
                </span>
            </div>

            <div className="space-y-3">
                {neglectedLeads.map(lead => (
                    <div key={lead.id} className="bg-white p-3 rounded-lg border border-red-100 flex items-center justify-between">
                        <div>
                            <p className="font-bold text-slate-800">{lead.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-medium text-slate-500">{lead.assignedBrokerId ? 'Broker Assigned' : 'Unassigned'}</span>
                                <span className="text-[10px] text-slate-300">•</span>
                                <span className="text-xs text-red-500 font-medium flex items-center gap-1" suppressHydrationWarning>
                                    <Clock size={10} />
                                    {Math.floor((Date.now() - new Date(lead.lastActivity).getTime()) / 3600000)}h idle
                                </span>
                            </div>
                        </div>
                        <Link href={`/client/${lead.id}`} className="text-red-600 hover:text-red-800">
                            <ChevronRight size={20} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
