import { clsx } from 'clsx';

interface LeadScoreBadgeProps {
    score: number;
}

export default function LeadScoreBadge({ score }: LeadScoreBadgeProps) {
    const getColor = (s: number) => {
        if (s >= 71) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        if (s >= 41) return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    };

    return (
        <div className={clsx(
            "px-2.5 py-1 rounded-lg border font-bold text-xs inline-flex items-center gap-2 font-body",
            getColor(score)
        )}>
            <span className="opacity-60 text-[10px] uppercase tracking-wider">Score</span>
            <span className="text-sm tracking-tight">{score}</span>
        </div>
    );
}
