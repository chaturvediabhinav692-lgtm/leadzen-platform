'use client';

import { Client } from '@/lib/mockData';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

interface DailyFollowUpsProps {
    clients: Client[];
}

export default function DailyFollowUps({ clients }: DailyFollowUpsProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Today's Follow-ups</h3>
            <div className="space-y-4">
                {clients.length === 0 ? (
                    <p className="text-slate-500 text-sm">No follow-ups pending for today.</p>
                ) : (
                    clients.map(client => (
                        <div key={client.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                    <Phone size={16} />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900 text-sm">{client.name}</p>
                                    <p className="text-xs text-slate-500">{client.phone}</p>
                                </div>
                            </div>
                            <Link
                                href={`/client/${client.id}`}
                                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                                Call <ArrowRight size={12} />
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
