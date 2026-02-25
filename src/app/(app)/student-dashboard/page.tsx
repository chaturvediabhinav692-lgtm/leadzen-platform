'use client';

import { useState, useEffect } from 'react';
import { Client } from '@/lib/mockData';
import { dataService } from '@/lib/dataService';
import { getCurrentUser } from '@/lib/authMock';
import BrokerLayout from '@/layouts/BrokerLayout';
import StudentNextBestClient from '@/components/broker/StudentNextBestClient';
import StudentTaskQueue from '@/components/broker/StudentTaskQueue';
import QuickActionBar from '@/components/broker/QuickActionBar';
import RouteGuard from '@/components/layout/RouteGuard';

export default function BrokerDashboardPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [snoozed, setSnoozed] = useState<Record<string, number>>({});
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const user = getCurrentUser();

    // 1. Initial Fetch + Real-time Subscription
    useEffect(() => {
        let subscription: any;

        const init = async () => {
            setIsLoading(true);
            const data = await dataService.getUnassignedLeads();
            setClients(data);
            setIsLoading(false);

            subscription = dataService.subscribeToLeads((payload: any) => {
                // If it's a new lead (unassigned), add it
                if (payload.eventType === 'INSERT') {
                    if (!payload.new.assignedBrokerId || payload.new.assignedBrokerId === 'unassigned') {
                        setClients(prev => [payload.new as Client, ...prev]);
                    }
                }
                // If it's updated, check if it's now assigned to someone else (remove it) 
                // or if it's still unassigned (update it)
                else if (payload.eventType === 'UPDATE') {
                    if (payload.new.assignedBrokerId && payload.new.assignedBrokerId !== 'unassigned') {
                        setClients(prev => prev.filter(c => c.id !== payload.new.id));
                    } else {
                        setClients(prev => prev.map(c => c.id === payload.new.id ? { ...c, ...payload.new } : c));
                    }
                }
                else if (payload.eventType === 'DELETE') {
                    setClients(prev => prev.filter(c => c.id !== payload.old.id));
                }
            });
        };

        init();
        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    // Derived Data: Unassigned + Not Snoozed
    const now = Date.now();
    const activeClients = clients
        .filter(c => !snoozed[c.id] || snoozed[c.id] <= now);

    // Sort: HOT > WARM > COLD, then Recency
    const sortedClients = [...activeClients].sort((a, b) => {
        const priorityScore = { hot: 3, warm: 2, cold: 1, new: 1 } as any;
        const diff = (priorityScore[b.status] || 0) - (priorityScore[a.status] || 0);
        if (diff !== 0) return diff;
        return (b.lastActivityAt || 0) - (a.lastActivityAt || 0);
    });

    const heroClient = sortedClients[0] || null;

    // Handlers
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleAssign = async (id: string) => {
        await dataService.assignLead(id, user.id);
        showToast("Assigned to you");
    };

    const handleSnooze = (id: string) => {
        setSnoozed(prev => ({ ...prev, [id]: Date.now() + 10 * 60 * 1000 }));
        showToast("Snoozed for 10 min");
    };

    const handleWhatsApp = (client: Client) => {
        const message = encodeURIComponent(client.lastMessage || "Hi, we received your inquiry. Let's connect.");
        window.open(`https://wa.me/${client.phone.replace(/\s+/g, '')}?text=${message}`, '_blank');
    };

    const handleCall = (client: Client) => {
        window.location.href = `tel:${client.phone.replace(/\s+/g, '')}`;
    };

    if (isLoading) {
        return (
            <RouteGuard>
                <BrokerLayout>
                    <div className="flex items-center justify-center h-[80vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                </BrokerLayout>
            </RouteGuard>
        );
    }

    return (
        <RouteGuard>
            <BrokerLayout>
                {/* Simple Toast */}
                {toastMessage && (
                    <div className="fixed top-20 right-5 bg-slate-800 text-white px-4 py-2 rounded shadow-lg z-50 animate-bounce">
                        {toastMessage}
                    </div>
                )}

                {/* 1. Next Best Client (Card) */}
                <StudentNextBestClient
                    client={heroClient}
                    onAssign={handleAssign}
                    onSnooze={handleSnooze}
                    onWhatsApp={handleWhatsApp}
                    onCall={handleCall}
                />

                {/* 2. Task Queue (Table) */}
                <StudentTaskQueue
                    clients={sortedClients}
                    onAssign={handleAssign}
                    onSnooze={handleSnooze}
                    onWhatsApp={handleWhatsApp}
                    onCall={handleCall}
                />

                {/* 3. Quick Actions (Fixed) */}
                <QuickActionBar />
            </BrokerLayout>
        </RouteGuard>
    );
}
