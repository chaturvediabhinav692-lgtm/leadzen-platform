'use client';

import RouteGuard from '@/components/layout/RouteGuard';
import { useStore } from '@/lib/store';

import { Ticket as TicketIcon, CheckCircle, Clock } from 'lucide-react';
import { Ticket } from '@/lib/adminData';

// Redefining badges locally to avoid tight coupling or import issues if not exported
function AdminBadgePriority({ priority }: { priority: Ticket['priority'] }) {
    const styles = {
        High: 'text-red-700 bg-red-100 border border-red-200',
        Medium: 'text-orange-700 bg-orange-100 border border-orange-200',
        Low: 'text-slate-600 bg-slate-100 border border-slate-200',
    };
    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${styles[priority]}`}>
            {priority}
        </span>
    );
}

function AdminBadgeStatus({ status }: { status: Ticket['status'] }) {
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

import { useState, useEffect } from 'react';
import { dataService } from '@/lib/dataService';

export default function AdminTicketsPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    // 1. Initial Fetch + Real-time Subscription
    useEffect(() => {
        let subscription: any;

        const init = async () => {
            setIsLoading(true);
            const data = await dataService.getTickets();
            setTickets(data);
            setIsLoading(false);

            subscription = dataService.subscribeToTickets((payload: any) => {
                if (payload.eventType === 'INSERT') {
                    setTickets(prev => [payload.new as Ticket, ...prev]);
                } else if (payload.eventType === 'UPDATE') {
                    setTickets(prev => prev.map(t => t.id === payload.new.id ? { ...t, ...payload.new } : t));
                } else if (payload.eventType === 'DELETE') {
                    setTickets(prev => prev.filter(t => t.id !== payload.old.id));
                }
            });
        };

        init();
        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    const handleResolve = async (id: string) => {
        await dataService.resolveTicket(id);
        // Toast logic could go here if added
    };

    // Stats
    const total = tickets.length;
    const pending = tickets.filter(t => t.status === 'Open').length;
    const resolved = tickets.filter(t => t.status === 'Resolved').length;

    if (isLoading) {
        return (
            <RouteGuard>
                <div className="flex items-center justify-center h-[80vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            </RouteGuard>
        );
    }

    return (
        <RouteGuard>
            <div className="max-w-7xl mx-auto space-y-8 pb-32 px-4 sm:px-0">
                {/* Header */}
                <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Ticket Management</h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-1">Track and resolve user support requests.</p>
                </div>

                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Total Tickets</p>
                            <p className="text-3xl font-black text-slate-900">{total}</p>
                        </div>
                        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                            <TicketIcon size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Pending Action</p>
                            <p className="text-3xl font-black text-orange-600">{pending}</p>
                        </div>
                        <div className="p-3 rounded-full bg-orange-50 text-orange-600">
                            <Clock size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Resolved</p>
                            <p className="text-3xl font-black text-green-600">{resolved}</p>
                        </div>
                        <div className="p-3 rounded-full bg-green-50 text-green-600">
                            <CheckCircle size={24} />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Ticket ID</th>
                                    <th className="px-6 py-4">Client Name</th>
                                    <th className="px-6 py-4">Issue</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {tickets.map(ticket => (
                                    <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <AdminBadgeStatus status={ticket.status} />
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-slate-500">#{ticket.id}</td>
                                        <td className="px-6 py-4 font-bold text-slate-800 text-sm">{ticket.userName}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <AdminBadgePriority priority={ticket.priority} />
                                                <span className="font-medium text-slate-800 text-sm">{ticket.issueType}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 line-clamp-1">{ticket.description}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{new Date(ticket.createdDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setSelectedTicket(ticket)}
                                                    className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded hover:bg-blue-100 transition-colors"
                                                >
                                                    View
                                                </button>
                                                {ticket.status === 'Open' && (
                                                    <button
                                                        onClick={() => handleResolve(ticket.id)}
                                                        className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors shadow-sm"
                                                    >
                                                        Mark Resolved
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Detail Modal */}
                {selectedTicket && (
                    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                            {/* Modal Header */}
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <TicketIcon size={18} className="text-slate-400" />
                                    <h3 className="font-bold text-slate-900">Ticket #{selectedTicket.id}</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedTicket(null)}
                                    className="text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <span className="text-2xl leading-none">&times;</span>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">User</p>
                                        <p className="text-sm font-semibold text-slate-800">{selectedTicket.userName}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date Created</p>
                                        <p className="text-sm text-slate-600">{new Date(selectedTicket.createdDate).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Issue Type</p>
                                        <p className="text-sm text-slate-600">{selectedTicket.issueType}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority & Status</p>
                                        <div className="flex items-center gap-2">
                                            <AdminBadgePriority priority={selectedTicket.priority} />
                                            <AdminBadgeStatus status={selectedTicket.status} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Description</p>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <p className="text-sm text-slate-700 leading-relaxed italic">
                                            "{selectedTicket.description}"
                                        </p>
                                    </div>
                                </div>

                                {selectedTicket.image && (
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Screenshot</p>
                                        <img
                                            src={selectedTicket.image}
                                            alt="Ticket attachment"
                                            className="w-full h-auto max-h-60 object-contain rounded-xl border border-slate-200 shadow-sm"
                                        />
                                    </div>
                                ) || (
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Screenshot</p>
                                            <div className="bg-slate-50 rounded-xl py-8 flex flex-col items-center justify-center text-slate-400">
                                                <p className="text-xs">No screenshot provided</p>
                                            </div>
                                        </div>
                                    )}
                            </div>

                            {/* Modal Footer */}
                            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
                                <button
                                    onClick={() => setSelectedTicket(null)}
                                    className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors"
                                >
                                    Close
                                </button>
                                {selectedTicket.status === 'Open' && (
                                    <button
                                        onClick={() => {
                                            handleResolve(selectedTicket.id);
                                            setSelectedTicket(null);
                                        }}
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95"
                                    >
                                        Mark Resolved
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </RouteGuard>
    );
}

