import { clsx } from "clsx";
import { Flame, Sun, Snowflake } from "lucide-react";
import { InterestLevel } from "@/lib/mockData";

interface InterestBadgeProps {
    level: InterestLevel;
}

export default function InterestBadge({ level }: InterestBadgeProps) {
    const config = {
        HOT: { color: "bg-red-100 text-red-700 border-red-200", icon: Flame, label: "HOT" },
        WARM: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Sun, label: "WARM" },
        COLD: { color: "bg-slate-100 text-slate-500 border-slate-200", icon: Snowflake, label: "COLD" },
    };

    const { color, icon: Icon, label } = config[level || 'COLD'];

    return (
        <div className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wide", color)}>
            <Icon size={12} strokeWidth={3} />
            {label}
        </div>
    );
}
