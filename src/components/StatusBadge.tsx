import { clsx } from 'clsx';
import { ClientStatus } from '@/lib/mockData';

interface StatusBadgeProps {
    status: ClientStatus;
}

// Colors: new → gray, contacted → blue, interested → yellow, converted → green, rejected → red
const statusStyles: Record<ClientStatus, string> = {
    new: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    hot: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    warm: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    cold: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    assigned: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    converted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    snoozed: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    rejected: 'bg-rose-900/20 text-rose-500 border-rose-900/30',
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <span className={clsx(
            "px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
            statusStyles[status] || statusStyles.new
        )}>
            {status}
        </span>
    );
}
