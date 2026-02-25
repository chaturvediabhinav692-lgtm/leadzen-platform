'use client';

import { useStore } from '@/lib/store';
import InterestBadge from '../InterestBadge';

export default function RecentConversations() {
    const { clients } = useStore();

    // Get latest message from each client
    const recentChats = clients
        .map(c => ({
            ...c,
            lastMsgObj: c.conversation[c.conversation.length - 1]
        }))
        .sort((a, b) => new Date(b.lastMsgObj.timestamp).getTime() - new Date(a.lastMsgObj.timestamp).getTime())
        .slice(0, 6);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Recent Conversations</h3>
            <div className="space-y-4">
                {recentChats.map(client => (
                    <div key={client.id} className="flex gap-3 items-start border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-lg">
                            💬
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <p className="font-bold text-sm text-slate-900 truncate">{client.name}</p>
                                <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2" suppressHydrationWarning>
                                    {new Date(client.lastMsgObj.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>

                            </div>
                            <p className="text-xs text-slate-500 truncate mt-0.5">
                                <span className={client.lastMsgObj.sender === 'client' ? 'font-medium text-slate-700' : 'text-slate-400'}>
                                    {client.lastMsgObj.sender === 'client' ? 'Client: ' : 'You: '}
                                </span>
                                {client.lastMsgObj.text}
                            </p>
                            <div className="mt-1.5">
                                <InterestBadge level={client.interestLevel} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
