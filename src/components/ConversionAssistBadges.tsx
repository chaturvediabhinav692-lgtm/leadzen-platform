import { clsx } from "clsx";
import { AlertCircle, Clock, Flame, CheckCircle } from "lucide-react";

export type PriorityLevel = 'urgent' | 'follow-up' | 'hot' | 'normal';

interface PriorityBadgeProps {
    priority: PriorityLevel;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
    const config = {
        urgent: { color: "bg-red-100 text-red-700 border-red-200", icon: AlertCircle, label: "Urgent" },
        "follow-up": { color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock, label: "Overdue" },
        hot: { color: "bg-orange-100 text-orange-700 border-orange-200 animated-pulse", icon: Flame, label: "Hot Lead" },
        normal: { color: "bg-slate-100 text-slate-600 border-slate-200", icon: undefined, label: "Normal" },
    };

    const { color, icon: Icon, label } = config[priority];

    return (
        <div className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wide", color)}>
            {Icon && <Icon size={12} strokeWidth={3} />}
            {label}
        </div>
    );
}

export function ReminderTag({ type }: { type: 'call' | 'overdue' }) {
    if (type === 'call') {
        return <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100">📞 CALL TODAY</span>;
    }
    return <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold border border-red-100">⚠️ OVERDUE</span>;
}
