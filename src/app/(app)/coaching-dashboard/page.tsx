'use client';

import { useState, useEffect } from 'react';
import { Client } from '@/lib/mockData';
import { dataService } from '@/lib/dataService';
import Metrics from '@/components/coaching-dashboard/Metrics';
import HotLeads from '@/components/coaching-dashboard/HotLeads';
import RecentActivity from '@/components/coaching-dashboard/RecentActivity';
import BrokerPerformance from '@/components/coaching-dashboard/BrokerPerformance';
import RouteGuard from '@/components/layout/RouteGuard';

export default function CoachingDashboardPage() {
    const [leads, setLeads] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let subscription: any;

        const init = async () => {
            setIsLoading(true);
            const data = await dataService.getLeads();
            setLeads(data);
            setIsLoading(false);

            subscription = dataService.subscribeToLeads((payload: any) => {
                if (payload.eventType === 'INSERT') {
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
            <div className="max-w-7xl mx-auto space-y-8 p-6">
                <div className="flex justify-between items-center border-b border-slate-200 pb-5">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Pipeline Overview</h1>
                        <p className="text-slate-500 mt-1">Real-time Client & Sales Performance Monitoring</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                            Export Data
                        </button>
                        <button className="px-4 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
                            Settings
                        </button>
                    </div>
                </div>

                <Metrics clients={leads} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[500px]">
                    <div className="lg:col-span-2 h-full">
                        <HotLeads clients={leads} />
                    </div>
                    <div className="lg:col-span-1 h-full">
                        <RecentActivity clients={leads} />
                    </div>
                </div>

                <BrokerPerformance clients={leads} />
            </div>
        </RouteGuard>
    );
}
