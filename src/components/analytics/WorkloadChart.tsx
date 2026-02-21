'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Client } from '@/lib/mockData';

interface WorkloadChartProps {
    clients: Client[];
    title?: string;
}

export default function WorkloadChart({ clients }: WorkloadChartProps) {
    // Process Data based on User's Unified Logic
    const urgentCount = clients.filter(c => c.status === 'hot' && c.stage !== 'converted').length;
    const activePipeline = clients.filter(c => c.status === 'warm' && c.stage !== 'converted').length;
    const lowPriority = clients.filter(c => c.status === 'cold' && c.stage !== 'converted').length;

    const data = [
        { name: 'Urgent', value: urgentCount, color: '#ef4444' }, // Red
        { name: 'Active', value: activePipeline, color: '#eab308' }, // Yellow
        { name: 'Low Priority', value: lowPriority, color: '#9ca3af' }, // Gray
    ];

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-grow min-h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tick={{ fontSize: 12, fill: '#64748b', fontWeight: 'bold' }}
                            width={80}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 border-t border-slate-50 pt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-xs font-bold text-slate-600 uppercase">Urgent</span>
                    <span className="text-sm font-black text-red-600">{urgentCount}</span>
                </div>
                <div className="w-px h-3 bg-slate-200" />
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="text-xs font-bold text-slate-600 uppercase">Active</span>
                    <span className="text-sm font-black text-yellow-600">{activePipeline}</span>
                </div>
                <div className="w-px h-3 bg-slate-200" />
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                    <span className="text-xs font-bold text-slate-600 uppercase">Low</span>
                    <span className="text-sm font-black text-slate-600">{lowPriority}</span>
                </div>
            </div>
        </div>
    );
}
