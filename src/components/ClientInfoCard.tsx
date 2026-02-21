'use client';

import { Client, Broker } from '@/lib/mockData';
import { Mail, Phone, MapPin, Calendar, Clock, BookOpen, User } from 'lucide-react';
import LeadScoreBadge from './LeadScoreBadge';
import InterestBadge from './InterestBadge';

interface ClientInfoCardProps {
    client: Client;
    brokers: Broker[];
}

export default function ClientInfoCard({ client, brokers }: ClientInfoCardProps) {
    const currentBroker = brokers.find(b => b.id === client.assignedBrokerId);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{client.name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <InterestBadge level={client.interestLevel} />
                        <span className="text-slate-400 text-xs uppercase font-bold">•</span>
                        <span className="text-slate-500 text-sm font-medium">{client.source} Lead</span>
                    </div>
                </div>
                <LeadScoreBadge score={client.leadScore} />
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                    <Phone size={18} className="text-slate-400" />
                    <span className="font-medium text-lg">{client.phone}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold mb-1">Course Interest</p>
                        <div className="flex items-center gap-2 text-slate-800 font-semibold">
                            <BookOpen size={16} className="text-blue-500" />
                            {client.courseInterest}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold mb-1">Timeline</p>
                        <div className="flex items-center gap-2 text-slate-800 font-semibold">
                            <Clock size={16} className="text-orange-500" />
                            {client.timeline}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold mb-1">Location</p>
                        <div className="flex items-center gap-2 text-slate-800">
                            <MapPin size={16} className="text-slate-400" />
                            {client.location}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold mb-1">Last Activity</p>
                        <div className="flex items-center gap-2 text-slate-800">
                            <Calendar size={16} className="text-slate-400" />
                            {new Date(client.lastActivity).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-3">Assigned Broker</p>
                    {currentBroker ? (
                        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                                {currentBroker.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{currentBroker.name}</p>
                                <p className="text-xs text-slate-500">{currentBroker.phone}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="p-3 bg-yellow-50 text-yellow-800 text-sm font-medium rounded-lg border border-yellow-100 text-center">
                            Unassigned
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
