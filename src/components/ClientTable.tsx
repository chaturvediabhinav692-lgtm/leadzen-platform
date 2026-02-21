'use client';

import { useStore } from '@/lib/store';
import Link from 'next/link';
import { Search, Filter, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { InterestLevel, CourseInterest } from '@/lib/mockData';
import { clsx } from 'clsx';
import InterestBadge from './InterestBadge';
import LeadScoreBadge from './LeadScoreBadge';

export default function ClientTable() {
    const { clients, brokers } = useStore();
    const [search, setSearch] = useState('');
    const [interestFilter, setInterestFilter] = useState<InterestLevel | 'all'>('all');
    const [courseFilter, setCourseFilter] = useState<CourseInterest | 'all'>('all');
    const [brokerFilter, setBrokerFilter] = useState<string | 'all'>('all');

    const filteredClients = clients.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase()) ||
            client.phone.includes(search);
        const matchesInterest = interestFilter === 'all' || client.interestLevel === interestFilter;
        const matchesCourse = courseFilter === 'all' || client.courseInterest === courseFilter;
        const matchesBroker = brokerFilter === 'all' ||
            (brokerFilter === 'unassigned' ? client.assignedBrokerId === null : client.assignedBrokerId === brokerFilter);

        return matchesSearch && matchesInterest && matchesCourse && matchesBroker;
    });

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search clients by name or phone..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">Filters:</span>
                    </div>

                    <select
                        className="border border-slate-200 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={interestFilter}
                        onChange={(e) => setInterestFilter(e.target.value as InterestLevel | 'all')}
                    >
                        <option value="all">All Interests</option>
                        <option value="HOT">HOT Leads</option>
                        <option value="WARM">WARM Leads</option>
                        <option value="COLD">COLD Leads</option>
                    </select>

                    <select
                        className="border border-slate-200 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={courseFilter}
                        onChange={(e) => setCourseFilter(e.target.value as CourseInterest | 'all')}
                    >
                        <option value="all">All Courses</option>
                        <option value="JEE">JEE</option>
                        <option value="NEET">NEET</option>
                        <option value="UPSC">UPSC</option>
                        <option value="SSC">SSC</option>
                        <option value="Commerce">Commerce</option>
                    </select>

                    <select
                        className="border border-slate-200 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={brokerFilter}
                        onChange={(e) => setBrokerFilter(e.target.value)}
                    >
                        <option value="all">All Brokers</option>
                        <option value="unassigned">Unassigned</option>
                        {brokers.map(broker => (
                            <option key={broker.id} value={broker.id}>{broker.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Name / Phone</th>
                                <th className="px-6 py-4">Interest</th>
                                <th className="px-6 py-4">Course</th>
                                <th className="px-6 py-4">Score</th>
                                <th className="px-6 py-4">Broker</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredClients.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        No clients found matching your filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredClients.map(client => (
                                    <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{client.name}</div>
                                            <div className="text-slate-500 text-xs">{client.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <InterestBadge level={client.interestLevel} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">
                                                {client.courseInterest}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <LeadScoreBadge score={client.leadScore} />
                                        </td>
                                        <td className="px-6 py-4">
                                            {brokers.find(b => b.id === client.assignedBrokerId)?.name || (
                                                <span className="text-slate-400 italic">Unassigned</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/client/${client.id}`}
                                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-xs border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50"
                                            >
                                                Details <ExternalLink size={12} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
