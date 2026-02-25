'use client';

import { useStore } from '@/lib/store';
import { Flame, Sun, Snowflake } from 'lucide-react';

export default function LeadQualityBreakdown() {
    const { clients } = useStore();

    const hotCount = clients.filter(c => c.interestLevel === 'HOT').length;
    const warmCount = clients.filter(c => c.interestLevel === 'WARM').length;
    const coldCount = clients.filter(c => c.interestLevel === 'COLD').length;

    const Card = ({ label, count, icon: Icon, bg, text, border }: any) => (
        <div className={`flex-1 p-4 rounded-xl border ${bg} ${border} flex items-center justify-between`}>
            <div>
                <p className={`text-xs font-bold uppercase tracking-wider ${text} opacity-70`}>{label}</p>
                <p className={`text-2xl font-black ${text}`}>{count}</p>
            </div>
            <div className={`p-2 rounded-full bg-white/50 ${text}`}>
                <Icon size={20} />
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Lead Quality</h3>
            <div className="flex flex-col gap-3">
                <Card
                    label="HOT Leads"
                    count={hotCount}
                    icon={Flame}
                    bg="bg-gradient-to-br from-red-50 to-orange-50"
                    text="text-red-700"
                    border="border-red-100"
                />
                <Card
                    label="WARM Leads"
                    count={warmCount}
                    icon={Sun}
                    bg="bg-yellow-50"
                    text="text-yellow-700"
                    border="border-yellow-100"
                />
                <Card
                    label="COLD Leads"
                    count={coldCount}
                    icon={Snowflake}
                    bg="bg-slate-50"
                    text="text-slate-500"
                    border="border-slate-100"
                />
            </div>
        </div>
    );
}
