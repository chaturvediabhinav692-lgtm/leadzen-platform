'use client';

import { useStore } from '@/lib/store';
import { Phone, ArrowRight } from 'lucide-react';
import InterestBadge from '../InterestBadge';
import LeadScoreBadge from '../LeadScoreBadge';
import Link from 'next/link';

export default function HotLeadsPanel() {
    const { clients, assignBroker } = useStore();

    const hotLeads = clients
        .filter(c => c.interestLevel === 'HOT' && c.status !== 'converted')
        .sort((a, b) => b.leadScore - a.leadScore)
        .slice(0, 5);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    🔥 Hot Leads <span className="text-slate-400 text-sm font-normal">(Top 5)</span>
                </h3>
            </div>

            <div className="space-y-3">
                {hotLeads.map(lead => (
                    <div key={lead.id} className="p-3 bg-orange-50/50 border border-orange-100 rounded-lg transition-all hover:shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="font-bold text-slate-900">{lead.name}</div>
                                <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                                    <span>{lead.courseInterest}</span>
                                    <span>•</span>
                                    <span>{lead.location}</span>
                                </div>
                                <div className="text-xs text-slate-400 mt-2 italic flex items-center gap-1">
                                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-[8px] text-green-700">💬</span>
                                    </div>
                                    "{lead.lastMessage.substring(0, 50)}..."
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <InterestBadge level={lead.interestLevel} />
                                <span className="text-xs font-bold text-slate-700">Score: {lead.leadScore}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 w-full mt-3">
                            <Link
                                href={`/client/${lead.id}`}
                                className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
