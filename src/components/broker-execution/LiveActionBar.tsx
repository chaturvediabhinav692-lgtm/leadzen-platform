'use client';

import { useStore } from '@/lib/store';
import { Flame, Clock, CheckCircle } from 'lucide-react';

interface LiveActionBarProps {
    hotCount: number;
    warmCount: number;
    convertedCount: number;
    attentionCount: number;
}

export default function LiveActionBar({
    hotCount,
    warmCount,
    convertedCount,
    attentionCount
}: LiveActionBarProps) {
    return (
        <div className="sticky top-0 z-40 bg-[#0f0f0f] text-white shadow-2xl border-b border-[#1f1f1f] backdrop-blur-md bg-opacity-95">
            <div className="max-w-full overflow-x-auto no-scrollbar">
                <div className="flex justify-between items-center min-w-max md:min-w-0 px-4 py-2 gap-6">
                    <div className="flex items-center gap-6">
                        <div className={`flex items-center gap-2 font-bold whitespace-nowrap ${hotCount > 0 ? 'text-red-400 animate-pulse' : 'text-slate-400'}`}>
                            <Flame className={hotCount > 0 ? 'fill-red-500 text-red-500' : ''} size={18} />
                            <span>{hotCount} HOT LEADS</span>
                        </div>

                        <div className="w-px h-4 bg-slate-700" />

                        <div className="flex items-center gap-2 text-yellow-400 font-medium whitespace-nowrap">
                            <span className="bg-yellow-500/20 px-2 py-0.5 rounded text-xs">WARM</span>
                            <span>{warmCount} pending</span>
                        </div>

                        <div className="w-px h-4 bg-slate-700 hidden sm:block" />

                        <div className="flex items-center gap-2 text-slate-300 hidden sm:flex whitespace-nowrap">
                            <Clock size={16} className="text-orange-400" />
                            <span className="text-xs font-mono">{attentionCount} Needs Attention (&gt;10m)</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 whitespace-nowrap">
                        <CheckCircle size={16} />
                        <span>{convertedCount} CONVERTED</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
