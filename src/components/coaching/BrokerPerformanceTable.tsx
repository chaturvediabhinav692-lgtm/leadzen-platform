'use client';

import { useStore } from '@/lib/store';
import { INITIAL_BROKERS } from '@/lib/mockData';

export default function BrokerPerformance() {
    const { clients } = useStore();

    const metrics = INITIAL_BROKERS.map(broker => {
        const assigned = clients.filter(c => c.assignedBrokerId === broker.id);
        const converted = assigned.filter(c => c.status === 'converted');
        const assignedCount = assigned.length;
        const convertedCount = converted.length;
        const conversionRate = assignedCount > 0
            ? ((convertedCount / assignedCount) * 100).toFixed(1)
            : '0.0';

        // Mock Response Time (random between 5-30m)
        const avgResponseTime = `${Math.floor(Math.random() * 25) + 5}m`;

        return { ...broker, assignedCount, convertedCount, conversionRate, avgResponseTime };
    }).sort((a, b) => parseFloat(b.conversionRate) - parseFloat(a.conversionRate));

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-full">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Broker Performance</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">
                            <th className="py-3 pr-4">Broker</th>
                            <th className="py-3 px-2 text-center">Assigned</th>
                            <th className="py-3 px-2 text-center">Conv.</th>
                            <th className="py-3 px-2 text-right">Rate %</th>
                            <th className="py-3 pl-4 text-right">Avg Resp.</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {metrics.map(broker => (
                            <tr key={broker.id} className="hover:bg-slate-50">
                                <td className="py-3 pr-4 font-medium text-slate-700">{broker.name}</td>
                                <td className="py-3 px-2 text-center text-slate-600">{broker.assignedCount}</td>
                                <td className="py-3 px-2 text-center text-green-600 font-bold">{broker.convertedCount}</td>
                                <td className="py-3 px-2 text-right font-bold text-slate-800">{broker.conversionRate}%</td>
                                <td className="py-3 pl-4 text-right text-slate-500" suppressHydrationWarning>{broker.avgResponseTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
