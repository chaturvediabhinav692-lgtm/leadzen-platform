import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

const colorMap = {
    blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    yellow: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    red: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    purple: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
};

export default function StatsCard({ label, value, icon: Icon, trend, trendUp, color = 'blue' }: StatsCardProps) {
    return (
        <div className="bg-[#111217] p-6 rounded-2xl border border-white/5 font-body group hover:border-white/10 transition-all">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>

                    {trend && (
                        <div className={clsx(
                            "flex items-center gap-1.5 mt-2 text-xs font-semibold",
                            trendUp ? "text-emerald-400" : "text-rose-400"
                        )}>
                            <span className="text-sm">{trendUp ? '↑' : '↓'}</span>
                            <span>{trend}</span>
                        </div>
                    )}
                </div>

                <div className={clsx("p-3 rounded-xl transition-transform group-hover:scale-110", colorMap[color])}>
                    <Icon size={20} />
                </div>
            </div>
        </div>
    );
}
