'use client';

import { Client } from '@/lib/mockData';
import { Phone, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import LeadScoreBadge from '../LeadScoreBadge';
import InterestBadge from '../InterestBadge';

interface NextBestClientProps {
    clients: Client[];
}

export default function NextBestClient({ clients }: NextBestClientProps) {
    // Logic: HOT > WARM > NEW
    const bestLead = clients.find(c => c.interestLevel === 'HOT' && c.status !== 'converted') ||
        clients.find(c => c.interestLevel === 'WARM' && c.status !== 'converted') ||
        clients.find(c => c.status === 'new');

    if (!bestLead) return (
        <div className="p-8 text-center text-slate-500 bg-slate-100 rounded-xl border border-dashed border-slate-300">
            All caught up! No pending tasks.
        </div>
    );

    return (
        <div className="bg-white border-2 border-indigo-600 rounded-xl overflow-hidden shadow-xl">
            <div className="bg-indigo-600 px-4 py-2 flex justify-between items-center text-white">
                <span className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                    ⚡ Next Best Client
                </span>
                <span className="text-xs opacity-80 font-mono">
                    {bestLead.source} Lead
                </span>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Client Info */}
                <div className="md:col-span-2">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 leading-tight">{bestLead.name}</h2>
                            <div className="flex items-center gap-2 mt-1 text-slate-600 font-medium">
                                <span>{bestLead.courseInterest}</span>
                                <span className="text-slate-300">•</span>
                                <span>{bestLead.location}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-black text-indigo-600">{bestLead.leadScore}</div>
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-slate-50 rounded-lg border-l-4 border-indigo-200">
                        <p className="text-slate-700 italic text-lg">"{bestLead.lastMessage}"</p>
                        <div className="flex items-center gap-2 mt-2">
                            <InterestBadge level={bestLead.interestLevel} />
                            <span className="text-xs text-slate-400" suppressHydrationWarning>
                                {new Date(bestLead.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>

                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-1 flex flex-col gap-3 justify-center">
                    <button className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xl flex items-center justify-center gap-3 shadow-md active:scale-95 transition-transform">
                        <MessageCircle size={24} /> WhatsApp
                    </button>
                    <button className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-3 shadow-sm active:scale-95 transition-transform">
                        <Phone size={20} /> Call Now
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="py-3 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-bold flex items-center justify-center gap-2">
                            <Clock size={18} /> Later
                        </button>
                        <button className="py-3 bg-green-50 border-2 border-green-200 hover:bg-green-100 text-green-700 rounded-lg font-bold flex items-center justify-center gap-2">
                            <CheckCircle size={18} /> Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
