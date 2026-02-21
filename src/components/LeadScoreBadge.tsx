import { clsx } from 'clsx';

interface LeadScoreBadgeProps {
    score: number;
}

export default function LeadScoreBadge({ score }: LeadScoreBadgeProps) {
    const getColor = (s: number) => {
        if (s >= 71) return 'bg-green-100 text-green-700 border-green-200';
        if (s >= 41) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        return 'bg-red-100 text-red-700 border-red-200';
    };

    return (
        <div className={clsx(
            "px-3 py-1 rounded-lg border font-bold text-sm inline-flex items-center gap-2",
            getColor(score)
        )}>
            <span>Lead Score:</span>
            <span className="text-lg">{score}</span>
        </div>
    );
}
