import { Client } from '@/lib/mockData';
import { Users, MessageCircle, Flame, TrendingUp, Clock } from 'lucide-react';

export default function Metrics({ clients }: { clients: Client[] }) {
    const totalClients = clients.length;
    const highIntent = clients.filter(c => c.status === 'hot' && c.stage !== 'converted').length;
    const converted = clients.filter(c => c.stage === 'converted').length;
    const conversionRate = totalClients > 0 ? ((converted / totalClients) * 100).toFixed(1) : "0";

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Clients</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-1">{totalClients.toLocaleString()}</h3>
                    </div>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={20} /></div>
                </div>
                <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <TrendingUp size={12} /> Live Sync
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-slate-500">WhatsApp Conversations</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-1">--</h3>
                    </div>
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><MessageCircle size={20} /></div>
                </div>
                <p className="text-xs text-slate-400 font-medium">Tracking enabled</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-slate-500">High Intent Clients</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-1">{highIntent}</h3>
                    </div>
                    <div className="p-2 bg-red-50 text-red-600 rounded-lg"><Flame size={20} /></div>
                </div>
                <p className="text-xs text-slate-400 font-medium">Requiring immediate action</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Conversion Rate</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-1">{conversionRate}%</h3>
                    </div>
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><TrendingUp size={20} /></div>
                </div>
                <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <TrendingUp size={12} /> Based on stage
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Avg Response Time</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-1">--</h3>
                    </div>
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Clock size={20} /></div>
                </div>
                <p className="text-xs text-slate-400 font-medium">Coming soon</p>
            </div>
        </div>
    );
}
