import { clsx } from "clsx";
import { Flame, Sun, Snowflake } from "lucide-react";
import { InterestLevel } from "@/lib/mockData";

interface InterestBadgeProps {
    level: InterestLevel;
}

export default function InterestBadge({ level }: InterestBadgeProps) {
    const config = {
        HOT: { color: "bg-rose-500/10 text-rose-400 border-rose-500/20", icon: Flame, label: "HOT" },
        WARM: { color: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Sun, label: "WARM" },
        COLD: { color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: Snowflake, label: "COLD" },
    };

    const { color, icon: Icon, label } = config[level || 'COLD'];

    return (
        <div className={clsx("inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-[0.1em] font-body", color)}>
            <Icon size={12} strokeWidth={2.5} className={clsx(label === 'HOT' && "animate-pulse")} />
            {label}
        </div>
    );
}
