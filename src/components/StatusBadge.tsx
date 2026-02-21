import { clsx } from 'clsx';
import { ClientStatus } from '@/lib/mockData';

interface StatusBadgeProps {
    status: ClientStatus;
}

// Colors: new → gray, contacted → blue, interested → yellow, converted → green, rejected → red
const statusStyles: Record<ClientStatus, string> = {
    new: 'bg-gray-100 text-gray-700 border-gray-200',
    contacted: 'bg-blue-100 text-blue-700 border-blue-200',
    interested: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    converted: 'bg-green-100 text-green-700 border-green-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
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
