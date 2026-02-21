'use client';

import RouteGuard from '@/components/layout/RouteGuard';
import { useStore } from '@/lib/store';
import { Ticket } from '@/lib/adminData';
import { ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';

import { useState, useEffect } from 'react';
import { getStoredTickets } from '@/lib/ticketStorage';

export default function MyTicketsPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        setTickets(getStoredTickets());
    }, []);

    // In real app, filter for current user ID
    // const myTickets = tickets.filter(t => t.userId === 'current-user');
    const myTickets = tickets; // Show all for demo since we haven't implemented solid Auth


    return (
        <RouteGuard>
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Tickets</h1>
                        <p className="text-slate-500 mt-1">Track status of your reported issues.</p>
                    </div>
                    <Link href="/help" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-sm">
                        Create New Ticket <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800">Support History</h3>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search tickets..."
                                className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Ticket ID</th>
                                    <th className="px-6 py-4">Issue Type</th>
                                    <th className="px-6 py-4">Priority</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Created Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {myTickets.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                            No tickets found. Need help? <Link href="/help" className="text-blue-600 hover:underline">Submit a ticket</Link>.
                                        </td>
                                    </tr>
                                ) : (
                                    myTickets.map((ticket) => (
                                        <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-slate-500">#{ticket.id}</td>
                                            <td className="px-6 py-4 font-medium text-slate-800">{ticket.issueType}</td>
                                            <td className="px-6 py-4">
                                                <BadgePriority priority={ticket.priority} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <BadgeStatus status={ticket.status} />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {new Date(ticket.createdDate).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </RouteGuard>
    );
}

function BadgePriority({ priority }: { priority: Ticket['priority'] }) {
    const styles = {
        High: 'bg-red-100 text-red-700',
        Medium: 'bg-orange-100 text-orange-700',
        Low: 'bg-slate-100 text-slate-600',
    };
    return (
        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${styles[priority]}`}>
            {priority}
        </span>
    );
}

function BadgeStatus({ status }: { status: Ticket['status'] }) {
    const styles = {
        Open: 'bg-green-100 text-green-700',
        Resolved: 'bg-slate-100 text-slate-500',
    };
    return (
        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase flex items-center gap-1 w-fit ${styles[status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status === 'Open' ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
            {status}
        </span>
    );
}
