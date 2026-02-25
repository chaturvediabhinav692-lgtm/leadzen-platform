import { Client } from '@/lib/mockData';
import LeadScoreBadge from '../LeadScoreBadge';
import { ArrowRight } from 'lucide-react';

export default function HotLeads({ clients }: { clients: Client[] }) {
    const hotLeads = clients
        .filter(c => c.status === 'hot' && c.stage !== 'converted')
        .sort((a, b) => b.leadScore - a.leadScore)
        .slice(0, 5);

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-lg text-slate-800">High Intent Clients</h3>
                <span className="text-xs text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md">Live Monitoring</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-6 py-3 text-left">Client Name</th>
                            <th className="px-6 py-3 text-left">Course Interest + Location</th>
                            <th className="px-6 py-3 text-left">Lead Score</th>
                            <th className="px-6 py-3 text-left">Assigned Broker</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {hotLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-900">{lead.name.replace('Student', 'Client')}</td>
                                <td className="px-6 py-4 text-slate-500">
                                    <div className="flex flex-col">
                                        <span>{lead.courseInterest}</span>
                                        <span className="text-xs text-slate-400">{lead.location}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4"><LeadScoreBadge score={lead.leadScore} /></td>
                                <td className="px-6 py-4 text-slate-600 font-medium">
                                    {/* Placeholder for assigned broker name or ID */}
                                    {lead.assignedBrokerId ? 'Agent ' + lead.assignedBrokerId.slice(-2) : 'Unassigned'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors">
                                            Assign Broker
                                        </button>
                                        <button className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded transition-colors flex items-center gap-1">
                                            Details <ArrowRight size={12} />
                                        </button>
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
