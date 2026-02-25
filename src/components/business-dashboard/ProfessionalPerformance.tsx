import { useStore } from '@/lib/store';
import { Client } from '@/lib/mockData';

export default function ProfessionalPerformance({ clients }: { clients: Client[] }) {
    if (!clients || !Array.isArray(clients)) return null;
    const { brokers } = useStore();

    const brokerStats = brokers.map(broker => {
        const assigned = clients.filter(c => c.assignedBrokerId === broker.id);
        const converted = assigned.filter(c => c.stage === 'converted');
        const active = assigned.filter(c => c.stage === 'active');
        const conversionRate = assigned.length > 0 ? (converted.length / assigned.length) * 100 : 0;

        return {
            ...broker,
            assignedCount: assigned.length,
            convertedCount: converted.length,
            activeCount: active.length,
            conversionRate
        };
    });

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">Sales Agent Performance</h3>
                <button className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline">Download Report</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-6 py-3 text-left">Sales Agent</th>
                            <th className="px-6 py-3 text-right">Clients Assigned</th>
                            <th className="px-6 py-3 text-right">Acitve</th>
                            <th className="px-6 py-3 text-right">Conversions</th>
                            <th className="px-6 py-3 text-right">Conversion Rate</th>
                            <th className="px-6 py-3 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {brokerStats.map((broker) => (
                            <tr key={broker.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-600 font-bold">
                                        {broker.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    {broker.name}
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-slate-600">{broker.assignedCount}</td>
                                <td className="px-6 py-4 text-right font-mono text-blue-600">{broker.activeCount}</td>
                                <td className="px-6 py-4 text-right font-mono text-green-600">{broker.convertedCount}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                                            <div className="bg-green-500 h-full rounded-full" style={{ width: `${broker.conversionRate}%` }} />
                                        </div>
                                        <span className="font-bold text-slate-700 w-12 text-right">{broker.conversionRate.toFixed(1)}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">Active</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
