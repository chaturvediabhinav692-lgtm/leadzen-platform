'use client';

import { Client, ClientCategory } from '@/lib/mockData';
import { Phone, MessageCircle, Home, Building2, Building, Landmark } from 'lucide-react';

interface StudentNextBestClientProps {
    client: Client | null;
    onAssign: (id: string) => void;
    onSnooze: (id: string) => void;
    onWhatsApp: (client: Client) => void;
    onCall: (client: Client) => void;
}

export default function StudentNextBestClient({ client, onWhatsApp, onCall }: StudentNextBestClientProps) {
    if (!client) return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Queue Empty</h3>
            <p className="text-slate-500">No pending leads to assign.</p>
        </div>
    );

    const isHot = client.interestLevel === 'HOT';
    // Visual restoration: Green Gradient Background
    return (
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none" />

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-white/20 text-white px-2 py-0.5 rounded text-xs font-bold uppercase backdrop-blur-sm">
                                NEXT BEST ACTION
                            </span>
                            <span className="text-white/80 text-sm flex items-center gap-1">
                                {client.source === 'WhatsApp' ? <MessageCircle size={14} /> : <Phone size={14} />}
                                {client.source} Lead
                            </span>
                        </div>
                        <h2 className="text-4xl font-bold mb-2 tracking-tight">{client.name}</h2>
                        <div className="flex flex-wrap items-center gap-2 text-green-100 opacity-90 text-sm md:text-base">
                            <span>{client.category}</span>
                            <span>•</span>
                            <span>{client.location}</span>
                            {isHot && (
                                <span className="bg-white/20 text-white px-2 py-0.5 rounded text-xs font-bold uppercase backdrop-blur-sm flex items-center gap-1">
                                    🔥 HOT
                                </span>
                            )}
                        </div>
                        <p className="mt-3 text-sm italic opacity-80 max-w-lg border-l-2 border-white/30 pl-3">
                            "{client.lastMessage}"
                        </p>
                    </div>

                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 text-center min-w-[100px]">
                        <p className="text-xs uppercase opacity-70 mb-1">Lead Score</p>
                        <p className="text-3xl font-black">{client.leadScore}</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                    <button
                        onClick={() => onWhatsApp(client)}
                        className="flex-1 bg-white text-green-700 hover:bg-green-50 py-3.5 px-6 rounded-xl font-bold shadow-sm flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95"
                    >
                        <MessageCircle className="fill-current" size={20} /> WhatsApp
                    </button>

                    <button
                        onClick={() => onCall(client)}
                        className="flex-1 bg-green-800/40 hover:bg-green-800/60 border border-white/20 text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                    >
                        <Phone size={20} /> Call Now
                    </button>

                    {/* Assign Button Removed per user request */}
                </div>
            </div>
        </div>
    );
}

const icons: Record<ClientCategory, any> = {
    '2BHK Flat': Home,
    '3BHK Luxury': Building2,
    'Penthouse': Building,
    'Villa': Home,
    'Commercial Plot': Landmark,
};
