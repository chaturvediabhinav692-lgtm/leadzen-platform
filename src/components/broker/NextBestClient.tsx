'use client';

import { Client } from '@/lib/mockData';
import { Phone, ArrowRight, CheckCircle, Clock, MessageCircle } from 'lucide-react';
import LeadScoreBadge from '../LeadScoreBadge';
import { PriorityBadge } from '../ConversionAssistBadges';
import InterestBadge from '../InterestBadge';

interface NextActionEngineProps {
    clients: Client[];
}

export default function NextBestClient({ clients }: NextActionEngineProps) {
    // Logic to find the "Best Next Action"
    // 1. HOT + WhatsApp (Speed to lead on preferred channel)
    // 2. HOT (Any source)
    // 3. WARM + WhatsApp (Engagement opportunity)
    // 4. New

    const bestLead = clients.find(c => c.interestLevel === 'HOT' && c.source === 'WhatsApp' && c.status !== 'converted') ||
        clients.find(c => c.interestLevel === 'HOT' && c.status !== 'converted') ||
        clients.find(c => c.interestLevel === 'WARM' && c.source === 'WhatsApp' && c.status !== 'converted') ||
        clients.find(c => c.status === 'new');

    if (!bestLead) return null;

    return (
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-white/20 text-white px-2 py-0.5 rounded text-xs font-bold uppercase backdrop-blur-sm">
                                Next Best Action
                            </span>
                            <span className="text-white/80 text-sm flex items-center gap-1">
                                {bestLead.source === 'WhatsApp' ? <MessageCircle size={14} /> : <Phone size={14} />}
                                {bestLead.source} Lead
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold mb-1">{bestLead.name}</h2>
                        <div className="flex items-center gap-2 text-green-100 opacity-90">
                            <span>{bestLead.courseInterest}</span>
                            <span>•</span>
                            <span>{bestLead.location}</span>
                            <div className="bg-white/20 px-1.5 rounded">
                                <InterestBadge level={bestLead.interestLevel} />
                            </div>
                        </div>
                        <p className="mt-2 text-sm italic opacity-80 max-w-md">"{bestLead.lastMessage}"</p>
                    </div>

                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 text-center min-w-[100px]">
                        <p className="text-xs uppercase opacity-70 mb-1">Lead Score</p>
                        <p className="text-3xl font-black">{bestLead.leadScore}</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button
                        onClick={() => alert(`Opening WhatsApp for ${bestLead.phone}...`)}
                        className="flex-1 bg-white text-green-700 hover:bg-green-50 py-3.5 px-6 rounded-xl font-bold shadow-sm flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95"
                    >
                        <MessageCircle className="fill-current" size={20} /> WhatsApp
                    </button>

                    <button
                        onClick={() => alert(`Calling ${bestLead.phone}...`)}
                        className="flex-1 bg-green-800/40 hover:bg-green-800/60 border border-white/20 text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                    >
                        <Phone size={20} /> Call Now
                    </button>

                    <button className="flex-1 bg-transparent hover:bg-white/10 border border-white/20 text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                        <CheckCircle size={20} /> Mark Converted
                    </button>
                </div>
            </div>
        </div>
    );
}
