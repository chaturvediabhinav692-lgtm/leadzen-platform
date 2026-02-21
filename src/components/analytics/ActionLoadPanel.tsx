'use client';

import { Client } from '@/lib/mockData';
import { AlertCircle, Clock, Calendar } from 'lucide-react';

interface ActionLoadPanelProps {
    clients: Client[];
}

export default function ActionLoadPanel({ clients }: ActionLoadPanelProps) {
    // 1. Action Required Today (Follow-ups due today + New Leads)
    // Simulating "Due Today" randomly for visualization or using 'new' status
    const actionRequired = clients.filter(c => c.status === 'new' || c.status === 'assigned').length;

    // 2. Inactive > 24h
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const inactiveCount = clients.filter(c =>
        (now.getTime() - new Date(c.lastActivity).getTime() > oneDay)
    ).length;

    // 3. Pending Follow-ups (Simulated)
    const pendingFollowUps = Math.floor(clients.length * 0.3); // Mock logic

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border-l-4 border-blue-500 p-4 rounded-r-xl shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Action Required Today</p>
                    <p className="text-2xl font-black text-slate-800" suppressHydrationWarning>{actionRequired}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <Calendar size={20} />
                </div>
            </div>

            <div className="bg-white border-l-4 border-orange-500 p-4 rounded-r-xl shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Inactive {'>'} 24h</p>
                    <p className="text-2xl font-black text-slate-800" suppressHydrationWarning>{inactiveCount}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                    <Clock size={20} />
                </div>
            </div>

            <div className="bg-white border-l-4 border-purple-500 p-4 rounded-r-xl shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Pending Follow-ups</p>
                    <p className="text-2xl font-black text-slate-800" suppressHydrationWarning>{pendingFollowUps}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                    <AlertCircle size={20} />
                </div>
            </div>
        </div>
    );
}
