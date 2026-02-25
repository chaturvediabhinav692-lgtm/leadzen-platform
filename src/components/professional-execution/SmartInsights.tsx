'use client';

import { AlertTriangle, Clock, TrendingDown } from 'lucide-react';

interface SmartInsightsProps {
    delayedCount: number;
    opportunityCount: number;
    replyRate: number;
}

export default function SmartInsights({ delayedCount, opportunityCount, replyRate }: SmartInsightsProps) {
    return (
        <div className="space-y-4 font-body">
            <div className={`p-4 rounded-xl border transition-all ${delayedCount > 0 ? 'bg-rose-500/[0.03] border-rose-500/20 shadow-lg shadow-rose-500/5' : 'bg-[#111217] border-white/5 opacity-60'}`}>
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${delayedCount > 0 ? 'bg-rose-500/10 text-rose-500' : 'bg-white/5 text-gray-500'}`}>
                        <Clock size={16} />
                    </div>
                    <div>
                        <p className={`text-[10px] font-bold uppercase tracking-widest ${delayedCount > 0 ? 'text-rose-400' : 'text-gray-500'}`}>Response Warning</p>
                        <p className={`text-sm font-semibold mt-1 ${delayedCount > 0 ? 'text-white' : 'text-gray-400'}`}>
                            {delayedCount} Hot leads waiting
                        </p>
                    </div>
                </div>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${opportunityCount > 0 ? 'bg-accent/[0.03] border-accent/20 shadow-lg shadow-accent/5' : 'bg-[#111217] border-white/5 opacity-60'}`}>
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${opportunityCount > 0 ? 'bg-accent/10 text-accent' : 'bg-white/5 text-gray-500'}`}>
                        <AlertTriangle size={16} />
                    </div>
                    <div>
                        <p className={`text-[10px] font-bold uppercase tracking-widest ${opportunityCount > 0 ? 'text-accent' : 'text-gray-500'}`}>Insight</p>
                        <p className={`text-sm font-semibold mt-1 ${opportunityCount > 0 ? 'text-white' : 'text-gray-400'}`}>
                            {opportunityCount} Warm leads active
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-[#111217] border border-white/5 p-5 rounded-xl text-center group hover:border-white/10 transition-all">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-3">Response Velocity</p>
                <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-bold text-white tracking-tight">{replyRate}%</span>
                    <div className={`p-1.5 rounded-lg ${replyRate < 45 ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {replyRate < 45 ? <TrendingDown size={14} /> : <TrendingDown size={14} className="rotate-180" />}
                    </div>
                </div>
            </div>
        </div>
    );
}
