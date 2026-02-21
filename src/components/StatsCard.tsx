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
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
};

export default function StatsCard({ label, value, icon: Icon, trend, trendUp, color = 'blue' }: StatsCardProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>

                    {trend && (
                        <div className={clsx(
                            "flex items-center mt-2 text-xs font-medium",
                            trendUp ? "text-green-600" : "text-red-600"
                        )}>
                            <span>{trendUp ? '↑' : '↓'} {trend}</span>
                        </div>
                    )}
                </div>

                <div className={clsx("p-3 rounded-lg", colorMap[color])}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );
}
