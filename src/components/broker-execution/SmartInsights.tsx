'use client';

import { AlertTriangle, Clock, TrendingDown } from 'lucide-react';

interface SmartInsightsProps {
    delayedCount: number;
    opportunityCount: number;
    replyRate: number;
}

export default function SmartInsights({ delayedCount, opportunityCount, replyRate }: SmartInsightsProps) {
    return (
        <div className="space-y-3">
            <div className={`p-3 rounded shadow-sm flex items-start gap-3 border-l-4 transition-colors ${delayedCount > 0 ? 'bg-red-50 border-red-400' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                <Clock className={`${delayedCount > 0 ? 'text-red-500' : 'text-slate-400'} flex-shrink-0 mt-0.5`} size={16} />
                <div>
                    <p className={`text-xs font-bold uppercase ${delayedCount > 0 ? 'text-red-800' : 'text-slate-500'}`}>Response Time Warning</p>
                    <p className={`text-sm font-medium ${delayedCount > 0 ? 'text-red-700' : 'text-slate-600'}`}>
                        {delayedCount} HOT leads waiting &gt; 15 min
                    </p>
                </div>
            </div>

            <div className={`p-3 rounded shadow-sm flex items-start gap-3 border-l-4 transition-colors ${opportunityCount > 0 ? 'bg-indigo-50 border-indigo-400' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                <AlertTriangle className={`${opportunityCount > 0 ? 'text-indigo-500' : 'text-slate-400'} flex-shrink-0 mt-0.5`} size={16} />
                <div>
                    <p className={`text-xs font-bold uppercase ${opportunityCount > 0 ? 'text-indigo-800' : 'text-slate-500'}`}>Opportunity</p>
                    <p className={`text-sm font-medium ${opportunityCount > 0 ? 'text-indigo-700' : 'text-slate-600'}`}>
                        {opportunityCount} WARM leads active now
                    </p>
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded text-center">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-1">Reply Rate</p>
                <div className="flex items-center justify-center gap-2 text-slate-800 font-bold">
                    {replyRate}% {replyRate < 45 ? <TrendingDown size={14} className="text-red-500" /> : <TrendingDown size={14} className="text-green-500 rotate-180" />}
                </div>
            </div>
        </div>
    );
}
