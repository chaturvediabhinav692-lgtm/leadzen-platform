'use client';

import { useStore } from '@/lib/store';

export default function MyPipeline() {
    const { clients } = useStore();

    const myLeads = clients.length; // In real app, filter by broker ID
    const pending = clients.filter(c => c.status === 'new').length;
    const converted = clients.filter(c => c.status === 'converted').length;

    return (
        <div className="flex items-center gap-6 text-sm py-2 px-4 bg-slate-900 text-slate-300 rounded-lg mb-2">
            <div className="flex items-center gap-2">
                <span className="font-bold text-white">{myLeads}</span>
                <span className="text-xs uppercase tracking-wide opacity-70">My Leads</span>
            </div>
            <div className="w-px h-3 bg-slate-700" />
            <div className="flex items-center gap-2">
                <span className="font-bold text-yellow-400">{pending}</span>
                <span className="text-xs uppercase tracking-wide opacity-70">Pending</span>
            </div>
            <div className="w-px h-3 bg-slate-700" />
            <div className="flex items-center gap-2">
                <span className="font-bold text-green-400">{converted}</span>
                <span className="text-xs uppercase tracking-wide opacity-70">Converted</span>
            </div>
        </div>
    );
}
