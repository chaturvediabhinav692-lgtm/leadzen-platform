'use client';

import { Activity } from '@/lib/mockData';
import { Phone, Mail, MessageSquare, RefreshCw, UserPlus, StickyNote } from 'lucide-react';
import { clsx } from 'clsx';

interface ActivityTimelineProps {
    activities: Activity[];
}

const iconMap: Record<Activity['type'], React.ElementType> = {
    call: Phone,
    message: MessageSquare,
    email: Mail,
    status_change: RefreshCw,
    assignment: UserPlus,
    note: StickyNote,
};

const colorMap: Record<Activity['type'], string> = {
    call: 'bg-blue-100 text-blue-600',
    message: 'bg-green-100 text-green-600',
    email: 'bg-purple-100 text-purple-600',
    status_change: 'bg-orange-100 text-orange-600',
    assignment: 'bg-indigo-100 text-indigo-600',
    note: 'bg-yellow-100 text-yellow-600',
};

export default function ActivityTimeline({ activities }: ActivityTimelineProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Activity History</h3>

            <div className="relative pl-4 border-l-2 border-slate-100 space-y-6">
                {activities.map((activity) => {
                    const Icon = iconMap[activity.type] || StickyNote;

                    return (
                        <div key={activity.id} className="relative">
                            {/* Dot icon */}
                            <div className={clsx(
                                "absolute -left-[25px] p-1.5 rounded-full border-2 border-white shadow-sm",
                                colorMap[activity.type] || 'bg-slate-100 text-slate-600'
                            )}>
                                <Icon size={14} strokeWidth={2.5} />
                            </div>

                            {/* Content */}
                            <div>
                                <p className="text-sm text-slate-900 font-medium">
                                    {activity.content}
                                </p>
                                <span className="text-xs text-slate-400">
                                    {new Date(activity.timestamp).toLocaleString()}
                                </span>
                                <span className={clsx(
                                    "ml-2 text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wider",
                                    colorMap[activity.type]
                                )}>
                                    {activity.type.replace('_', ' ')}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
