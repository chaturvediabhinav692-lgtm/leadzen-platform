'use client';

import RouteGuard from '@/components/layout/RouteGuard';
import { useStore } from '@/lib/store';
import { Users, Ticket as TicketIcon, CheckCircle, TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { REVENUE_DATA, Ticket } from '@/lib/adminData';

import { useState, useEffect } from 'react';
import { getStoredTickets, resolveStoredTicket } from '@/lib/ticketStorage';

export default function AdminDashboardPage() {
    const { platformClients } = useStore();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    useEffect(() => {
        setTickets(getStoredTickets());
    }, []);

    const handleResolve = (id: string) => {
        const updated = resolveStoredTicket(id);
        setTickets(updated);
    };


    // Metrics
    const totalClients = platformClients.length;
    const activeSubs = platformClients.filter(c => c.status === 'Active').length;
    const totalTickets = tickets.length;
    const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;
    const pendingTickets = tickets.filter(t => t.status === 'Open').length;
    const totalRevenue = platformClients.reduce((acc, c) => acc + c.revenue, 0);

    return (
        <RouteGuard>
            <div className="max-w-7xl mx-auto space-y-8 pb-32 px-4 sm:px-0">
                {/* Header */}
                <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Platform Control Center</h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-1">Manage clients, support tickets, and revenue.</p>
                </div>

                {/* 1. Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard label="Total Clients" value={totalClients} icon={Users} color="bg-blue-50 text-blue-600" />
                    <MetricCard label="Active Subscriptions" value={activeSubs} icon={CheckCircle} color="bg-green-50 text-green-600" />
                    <MetricCard label="Pending Tickets" value={pendingTickets} icon={TicketIcon} color="bg-orange-50 text-orange-600" />
                    <MetricCard label="Monthly Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={DollarSign} color="bg-purple-50 text-purple-600" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 2. Revenue Graph */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <TrendingUp size={20} className="text-purple-600" /> Revenue Growth
                            </h3>
                            <select className="bg-slate-50 border border-slate-200 rounded text-xs p-1">
                                <option>Last 6 Months</option>
                            </select>
                        </div>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 3. Ticket Stats Summary */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center gap-6">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 mb-4">
                                <div className="text-4xl font-black text-slate-900">{totalTickets === 0 ? 0 : Math.round((resolvedTickets / totalTickets) * 100)}%</div>
                            </div>
                            <p className="text-slate-500 font-bold uppercase text-xs tracking-wide">Resolution Rate</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Total Tickets</span>
                                <span className="font-bold text-slate-900">{totalTickets}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Resolved</span>
                                <span className="font-bold text-green-600">{resolvedTickets}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Pending</span>
                                <span className="font-bold text-orange-600">{pendingTickets}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Ticket Management Table */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800">Recent Support Tickets</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Issue</th>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {tickets.length === 0 ? (
                                    <tr><td colSpan={5} className="text-center py-8 text-slate-500">No tickets found.</td></tr>
                                ) : (
                                    tickets.map(ticket => (
                                        <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <BadgeStatus status={ticket.status} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <BadgePriority priority={ticket.priority} />
                                                    <span className="font-bold text-slate-800 text-sm">{ticket.issueType}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-1 line-clamp-1 max-w-xs">{ticket.description}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-700">{ticket.userName}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500" suppressHydrationWarning>{new Date(ticket.createdDate).toLocaleDateString()}</td>

                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setSelectedTicket(ticket)}
                                                        className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded hover:bg-blue-100 transition-colors"
                                                    >
                                                        View
                                                    </button>
                                                    {ticket.status === 'Open' && (
                                                        <button
                                                            onClick={() => handleResolve(ticket.id)}
                                                            className="bg-white border border-slate-200 text-green-600 text-xs font-bold px-3 py-1 rounded hover:bg-green-50 hover:border-green-200 transition-colors"
                                                        >
                                                            Resolve
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 5. Client Overview Table ... */}
                {/* ... existing table ... */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800">Platform Clients</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Client Name</th>
                                    <th className="px-6 py-4">Plan</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Revenue</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {platformClients.map(client => (
                                    <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-800">{client.name}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{client.plan}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${client.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                client.status === 'Trial' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {client.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono text-slate-700">₹{client.revenue.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Ticket Detail Modal */}
                {selectedTicket && (
                    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-slate-900">Ticket Detail</h3>
                                <button onClick={() => setSelectedTicket(null)} className="text-slate-400 hover:text-slate-600 transition-colors text-2xl">&times;</button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">User</p><p className="font-semibold">{selectedTicket.userName}</p></div>
                                    <div><p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Priority</p><p className="font-semibold">{selectedTicket.priority}</p></div>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">Description</p>
                                    <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 italic">"{selectedTicket.description}"</p>
                                </div>
                                {selectedTicket.image && (
                                    <div>
                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">Attachment</p>
                                        <img src={selectedTicket.image} className="w-full h-auto max-h-48 object-contain rounded-xl border border-slate-200 shadow-sm" alt="attachment" />
                                    </div>
                                )}
                            </div>
                            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
                                <button onClick={() => setSelectedTicket(null)} className="px-4 py-2 text-sm text-slate-600 font-bold hover:text-slate-800">Close</button>
                                {selectedTicket.status === 'Open' && (
                                    <button
                                        onClick={() => { handleResolve(selectedTicket.id); setSelectedTicket(null); }}
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95"
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


function MetricCard({ label, value, icon: Icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs text-slate-500 font-bold uppercase mb-1">{label}</p>
                <p className="text-2xl font-black text-slate-900">{value}</p>
            </div>
            <div className={`p-3 rounded-full ${color}`}>
                <Icon size={24} />
            </div>
        </div>
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

function BadgePriority({ priority }: { priority: Ticket['priority'] }) {
    const styles = {
        High: 'text-red-600 bg-red-50 border border-red-100',
        Medium: 'text-orange-600 bg-orange-50 border border-orange-100',
        Low: 'text-slate-500 bg-slate-50 border border-slate-100',
    };
    return (
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${styles[priority]}`}>
            {priority}
        </span>
    );
}
