'use client';

import { useState, useEffect } from 'react';
import { Client } from '@/lib/mockData';
import { dataService } from '@/lib/dataService';
import { getCurrentUser } from '@/lib/authMock';
import RouteGuard from '@/components/layout/RouteGuard';
import WorkloadChart from '@/components/analytics/WorkloadChart';
import { AlertTriangle, Clock, MessageSquare, Phone, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BrokerCommandCenter() {
    const [leads, setLeads] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = getCurrentUser();

    // 1. Initial Fetch + Real-time Subscription
    useEffect(() => {
        let subscription: any;

        const init = async () => {
            setIsLoading(true);
            const data = await dataService.getLeads();
            setLeads(data);
            setIsLoading(false);

            subscription = dataService.subscribeToLeads((payload: any) => {
                if (payload.eventType === 'INSERT') {
                    // Only add if assigned to this broker or we fetch all and filter in render
                    setLeads(prev => [payload.new as Client, ...prev]);
                } else if (payload.eventType === 'UPDATE') {
                    setLeads(prev => prev.map(l => l.id === payload.new.id ? { ...l, ...payload.new } : l));
                } else if (payload.eventType === 'DELETE') {
                    setLeads(prev => prev.filter(l => l.id !== payload.old.id));
                }
            });
        };

        init();
        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    // Filter by Current Broker (dataService already does this if broker role, but good to be safe)
    const myClients = leads.filter(c => c.assignedBrokerId === user.id);

    // 1. Metrics
    const activePipelineCount = myClients.filter(c => c.stage !== 'converted').length;
    const hotAssigned = myClients.filter(c => c.status === 'hot' && c.stage !== 'converted').length;
    const followUpsDue = hotAssigned; // Prototype logic
    const avgResponseTime = "12m"; // Placeholder

    // 2. Alert Logic
    const now = Date.now();
    const tenMins = 10 * 60 * 1000;
    const immediateAttention = myClients.filter(c =>
        c.status === 'hot' &&
        (now - c.lastActivityAt > tenMins) &&
        c.stage !== 'converted'
    );

    // 3. Top 5 Task Snapshot
    const topTasks = [...myClients]
        .filter(c => c.stage !== 'converted')
        .sort((a, b) => {
            const priorityScore: any = { hot: 3, warm: 2, cold: 1, new: 1 };
            const diff = (priorityScore[b.status] || 0) - (priorityScore[a.status] || 0);
            if (diff !== 0) return diff;
            return b.lastActivityAt - a.lastActivityAt;
        })
        .slice(0, 5);

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
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-20">
                {/* 1. Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Execution Command Center</h1>
                        <p className="text-slate-500 mt-1">Your daily performance snapshot</p>
                    </div>
                    <Link href="/broker-dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-sm">
                        Open Sales Cockpit <ArrowRight size={18} />
                    </Link>
                </div>

                {/* 2. Metrics Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <MetricCard label="My Active Leads" value={activePipelineCount} />
                    <MetricCard label="HOT Leads Assigned" value={hotAssigned} color="text-red-600" />
                    <MetricCard label="Follow-ups Due Today" value={followUpsDue} color="text-orange-600" />
                    <MetricCard label="Avg Response Time" value={avgResponseTime} color="text-green-600" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 3. Workload Graph (Filtered) */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Clock className="text-blue-500" /> My Workload Distribution
                            </h2>
                            <div className="flex-grow">
                                <WorkloadChart clients={myClients} />
                            </div>
                        </div>
                    </div>

                    {/* 4. Alert Panels */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="text-red-600" size={20} />
                                <h3 className="font-bold text-red-900">Needs Immediate Attention</h3>
                            </div>
                            {immediateAttention.length > 0 ? (
                                <ul className="space-y-2">
                                    {immediateAttention.slice(0, 3).map(c => (
                                        <li key={c.id} className="bg-white p-2 rounded border border-red-100 text-sm flex justify-between items-center">
                                            <span className="font-medium text-slate-700">{c.name}</span>
                                            <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">Delay</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-red-700/70 italic">No critical delays.</p>
                            )}
                        </div>

                        <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl">
                            <div className="flex items-center gap-1 mb-2">
                                <Clock className="text-yellow-600" size={18} />
                                <h3 className="font-bold text-yellow-900 text-sm uppercase">Follow-ups Pending</h3>
                            </div>
                            <p className="text-3xl font-black text-yellow-800">{followUpsDue}</p>
                        </div>
                    </div>
                </div>

                {/* 5. Mini Task Snapshot */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-slate-800">Top Priority Tasks</h3>
                        <span className="text-xs text-slate-500">Based on Urgency & Priority</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {topTasks.map(client => (
                            <div key={client.id} className="p-4 hover:bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
                                <div className="flex items-start gap-3">
                                    <div className={`w-2 h-2 rounded-full mt-2 ${client.interestLevel === 'HOT' ? 'bg-red-500' : client.interestLevel === 'WARM' ? 'bg-yellow-500' : 'bg-slate-300'}`} />
                                    <div>
                                        <p className="font-bold text-slate-900">{client.name}</p>
                                        <p className="text-sm text-slate-500 line-clamp-1">{client.lastMessage}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="WhatsApp">
                                        <MessageSquare size={18} />
                                    </button>
                                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Call">
                                        <Phone size={18} />
                                    </button>
                                    <Link href={`/broker-dashboard`} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="View in Cockpit">
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </RouteGuard>
    );
}

function MetricCard({ label, value, color = "text-slate-900" }: { label: string, value: string | number, color?: string }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold uppercase mb-1">{label}</p>
            <p className={`text-2xl font-black ${color}`}>{value}</p>
        </div>
    );
}
