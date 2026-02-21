'use client';

import { useStore } from '@/lib/store';
import { Activity } from '@/lib/mockData';
import { Clock } from 'lucide-react';

export default function GlobalActivityFeed() {
    const { clients } = useStore();

    // Aggregate all activities from all clients
    const allActivities = clients.flatMap(client =>
        client.activityHistory.map(activity => ({
            ...activity,
            clientName: client.name,
            clientId: client.id
        }))
    ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 8); // Top 8 recent

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-slate-400" /> Recent Activity
            </h3>
            <div className="space-y-4">
                {allActivities.map(activity => (
                    <div key={activity.id} className="flex gap-3 text-sm border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activity.type === 'status_change' ? 'bg-orange-400' :
                                activity.type === 'note' ? 'bg-yellow-400' :
                                    activity.type === 'call' ? 'bg-blue-400' : 'bg-slate-300'
                            }`} />
                        <div>
                            <p className="text-slate-900">
                                <span className="font-medium text-slate-700">{activity.clientName}</span>: {activity.content}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                {new Date(activity.timestamp).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
