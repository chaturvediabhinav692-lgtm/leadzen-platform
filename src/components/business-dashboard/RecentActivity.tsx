import { Client } from '@/lib/mockData';
import { MessageCircle, Phone, ArrowRight } from 'lucide-react';

export default function RecentActivity({ clients }: { clients: Client[] }) {
    // Generate activity feed from clients data sorted by last activity
    const activities = [...clients]
        .sort((a, b) => b.lastActivityAt - a.lastActivityAt)
        .slice(0, 6)
        .map(c => ({
            id: c.id,
            name: c.name.replace('Student', 'Client'),
            channel: c.source === 'WhatsApp' ? 'WhatsApp' : 'Call',
            detail: c.lastMessage || 'No recent message',
            time: new Date(c.lastActivityAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: c.source === 'WhatsApp' ? 'whatsapp' : 'call'
        }));

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-lg text-slate-800">Recent Activity</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-0">
                <div className="divide-y divide-slate-100">
                    {activities.map((activity) => (
                        <div key={activity.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-3">
                            <div className={`mt-1 p-2 rounded-full ${activity.type === 'whatsapp' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                {activity.type === 'whatsapp' ? <MessageCircle size={16} /> : <Phone size={16} />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <p className="text-sm font-bold text-slate-800 truncate">{activity.name}</p>
                                    <span className="text-xs text-slate-400 font-mono whitespace-nowrap" suppressHydrationWarning>{activity.time}</span>

                                </div>
                                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                                    <span className={`font-semibold ${activity.type === 'whatsapp' ? 'text-green-600' : 'text-blue-600'}`}>
                                        {activity.channel}
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span className="truncate">{activity.detail}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
                <button className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 w-full">
                    View All Activity <ArrowRight size={12} />
                </button>
            </div>
        </div>
    );
}
