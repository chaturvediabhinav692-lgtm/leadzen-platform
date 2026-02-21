'use client';

import { Client } from '@/lib/mockData';
import { Target, Clock, Filter, Trophy } from 'lucide-react';

interface DailyMetricsProps {
    clients: Client[];
}

export default function DailyMetrics({ clients }: DailyMetricsProps) {
    const totalAssigned = clients.length;
    const followUpsToday = clients.filter(c =>
        !['converted', 'rejected'].includes(c.status) &&
        new Date(c.lastActivity).getTime() < Date.now() - 86400000
    ).length;
    const interested = clients.filter(c => c.status === 'hot').length;
    const convertedToday = clients.filter(c =>
        c.status === 'converted' &&
        new Date(c.lastActivity).getTime() > Date.now() - 86400000
    ).length;

    const MetricItem = ({ label, value, icon: Icon, color }: any) => (
        <div className="flex items-center gap-3 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
            <div className={`p-2 rounded-lg ${color}`}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-2xl font-bold text-slate-900 leading-none" suppressHydrationWarning>{value}</p>
                <p className="text-xs text-slate-500 font-medium mt-1">{label}</p>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricItem label="My Leads" value={totalAssigned} icon={Target} color="bg-blue-100 text-blue-600" />
            <MetricItem label="Follow-ups" value={followUpsToday} icon={Clock} color="bg-yellow-100 text-yellow-600" />
            <MetricItem label="Interested" value={interested} icon={Filter} color="bg-orange-100 text-orange-600" />
            <MetricItem label="Won Today" value={convertedToday} icon={Trophy} color="bg-green-100 text-green-600" />
        </div>
    );
}
