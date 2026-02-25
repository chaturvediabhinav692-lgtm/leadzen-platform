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
        <div className="sticky top-0 z-40 bg-[#0b0c10]/95 text-white border-b border-white/5 backdrop-blur-xl font-body">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center py-3 gap-6">
                    <div className="flex items-center gap-8">
                        {/* Hot Leads */}
                        <div className={`flex items-center gap-2.5 font-bold text-[10px] tracking-[0.15em] uppercase transition-all ${hotCount > 0 ? 'text-rose-400' : 'text-gray-500'}`}>
                            <Flame className={hotCount > 0 ? 'fill-rose-500/20 text-rose-500 animate-pulse' : ''} size={16} />
                            <span>{hotCount} Hot Leads</span>
                        </div>

                        <div className="w-px h-3 bg-white/10" />

                        {/* Warm Leads */}
                        <div className="flex items-center gap-2.5 text-amber-400 font-bold text-[10px] tracking-[0.15em] uppercase">
                            <Clock size={16} className="text-amber-500" />
                            <span>{warmCount} Warm Pending</span>
                        </div>

                        <div className="w-px h-3 bg-white/10 hidden sm:block" />

                        {/* Attention */}
                        <div className="flex items-center gap-2.5 text-gray-400 hidden sm:flex text-[10px] tracking-[0.15em] uppercase font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse" />
                            <span>{attentionCount} Slow Response</span>
                        </div>
                    </div>

                    {/* Converted */}
                    <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-[10px] tracking-[0.15em] uppercase bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                        <CheckCircle size={14} />
                        <span>{convertedCount} Converted</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
