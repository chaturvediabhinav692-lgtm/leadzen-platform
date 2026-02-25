'use client';

import { useStore } from '@/lib/store';

export default function MyPipeline() {
    const { clients } = useStore();
    // Mock filter for "My Clients" (simulated by using all or a subset)
    const myClients = clients;
    const pending = myClients.filter(c => c.status === 'new').length;
    const convertedToday = myClients.filter(c => c.status === 'converted').length; // Mock "Today"

    return (
        <div className="flex items-center gap-6 text-sm py-2 px-4 bg-slate-900 text-slate-300 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
                <span className="font-bold text-white">{myClients.length}</span>
                <span className="text-xs uppercase tracking-wide opacity-70">My Clients</span>
            </div>
            <div className="w-px h-3 bg-slate-700" />
            <div className="flex items-center gap-2">
                <span className="font-bold text-yellow-400">{pending}</span>
                <span className="text-xs uppercase tracking-wide opacity-70">Pending Follow-ups</span>
            </div>
            <div className="w-px h-3 bg-slate-700" />
            <div className="flex items-center gap-2">
                <span className="font-bold text-green-400">{convertedToday}</span>
                <span className="text-xs uppercase tracking-wide opacity-70">Converted Today</span>
            </div>
        </div>
    );
}
