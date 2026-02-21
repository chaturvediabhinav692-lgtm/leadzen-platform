'use client';

import { useStore } from '@/lib/store';
import { Users, UserPlus, Clock, CheckCircle, TrendingUp, MessageCircle, Flame } from 'lucide-react';
import StatsCard from './StatsCard';

export default function BusinessMetrics() {
    const { clients } = useStore();

    const totalLeads = clients.length;
    const whatsappLeads = clients.filter(c => c.source === 'WhatsApp').length;
    const hotLeads = clients.filter(c => c.interestLevel === 'HOT').length;
    const convertedLeads = clients.filter(c => c.status === 'converted').length;

    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0.0';

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatsCard
                label="Total Leads Today"
                value={totalLeads}
                icon={Users}
                color="blue"
            />
            <StatsCard
                label="WhatsApp Leads"
                value={whatsappLeads}
                icon={MessageCircle}
                color="green"
            />
            <StatsCard
                label="Hot Leads Count"
                value={hotLeads}
                icon={Flame}
                color="orange"
            />
            <StatsCard
                label="Conversion Rate"
                value={`${conversionRate}%`}
                icon={TrendingUp}
                color="indigo"
            />
            <StatsCard
                label="Avg Response"
                value="12m"
                icon={Clock}
                color="purple"
            />
        </div>
    );
}
