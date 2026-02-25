'use client';

import { useState, useEffect } from 'react';
import { Client, ClientStatus } from '@/lib/mockData';
import { dataService } from '@/lib/dataService';
import { getDynamicScore, getStatusFromScore } from '@/lib/leadScoring';
import LiveActionBar from '@/components/broker-execution/LiveActionBar';
import HeroClient from '@/components/broker-execution/HeroClient';
import ActionStream from '@/components/broker-execution/ActionStream';
import SmartInsights from '@/components/broker-execution/SmartInsights';
import QuickActions from '@/components/broker-execution/QuickActions';
import WorkloadChart from '@/components/analytics/WorkloadChart';
import RouteGuard from '@/components/layout/RouteGuard';
import { LayoutDashboard } from 'lucide-react';

export default function BrokerDashboardPage() {
    const [leads, setLeads] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [now, setNow] = useState(Date.now());

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

    // 2. Auto-refresh ticker for time-based metrics
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // 3. Dynamic Lead Scoring & Derived Metrics
    const scoredLeads: Client[] = leads.map(l => {
        const interestLevel = getDynamicScore(l.lastActivityAt);
        return {
            ...l,
            interestLevel,
            status: getStatusFromScore(interestLevel) as ClientStatus
        };
    });

    const hotLeadsCount = scoredLeads.filter(l => l.status === 'hot' && l.stage !== 'converted' && l.stage !== 'snoozed').length;
    const warmLeadsCount = scoredLeads.filter(l => l.status === 'warm' && l.stage !== 'converted' && l.stage !== 'snoozed').length;
    const convertedLeadsCount = scoredLeads.filter(l => l.stage === 'converted').length;

    const tenMins = 10 * 60 * 1000;
    const attentionCount = scoredLeads.filter(l =>
        l.stage === 'active' && (now - l.lastActivityAt > tenMins)
    ).length;

    const urgent = scoredLeads.filter(l => l.status === 'hot' && l.stage !== 'converted').length;
    const activePipeline = scoredLeads.filter(l => l.status === 'warm' && l.stage !== 'converted').length;
    const lowPriority = scoredLeads.filter(l => l.status === 'cold' && l.stage !== 'converted').length;

    const delayedLeadsCount = scoredLeads.filter(l => {
        const diff = (now - l.lastActivityAt) / (1000 * 60);
        return diff > 15 && l.status === 'hot' && l.stage !== 'converted';
    }).length;

    const activeWarmLeadsCount = scoredLeads.filter(l => {
        const diff = (now - l.lastActivityAt) / (1000 * 60);
        return diff <= 10 && l.status === 'warm' && l.stage !== 'converted';
    }).length;

    const replyRate = scoredLeads.length === 0
        ? 0
        : Math.round((scoredLeads.filter(l => l.status === 'hot' || l.stage === 'converted').length / scoredLeads.length) * 100);

    const activeLeads = scoredLeads.filter(l => l.stage !== 'converted' && l.stage !== 'snoozed');

    // 4. Action Handlers
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleMarkDone = async (id: string) => {
        await dataService.updateLead(id, { stage: 'converted', completed: true });
        showToast("Lead marked as converted");
    };

    const handleSnooze = async (id: string) => {
        await dataService.updateLead(id, { stage: 'snoozed', snoozed: true });
        showToast("Snoozed for later");
    };

    const getNextLead = () => {
        const priorityOrder: Record<string, number> = { hot: 3, warm: 2, cold: 1, new: 1 };
        return [...activeLeads].sort((a, b) => {
            const diff = (priorityOrder[b.status] || 0) - (priorityOrder[a.status] || 0);
            if (diff !== 0) return diff;
            return b.lastActivityAt - a.lastActivityAt;
        })[0];
    };

    const handleCallNext = () => {
        const next = getNextLead();
        if (!next) return showToast("No leads available to call");
        showToast(`Calling ${next.name}...`);
        setTimeout(() => {
            window.location.href = `tel:${next.phone.replace(/\s+/g, '')}`;
        }, 1000);
    };

    const handleWhatsAppQueue = () => {
        const next = getNextLead();
        if (!next) return showToast("No leads in queue");
        const message = encodeURIComponent("Hi, following up on your inquiry.");
        showToast(`Opening WhatsApp for ${next.name}...`);
        window.open(`https://wa.me/${next.phone.replace(/\s+/g, '')}?text=${message}`, '_blank');
    };

    const handleLogNote = async () => {
        const next = getNextLead();
        if (!next) return showToast("No active lead to log notes for");
        const note = prompt(`Enter a note for ${next.name}:`);
        if (!note || !note.trim()) return;

        await dataService.updateLead(next.id, {
            notes: (next.notes || '') + "\n" + note.trim()
        });
        showToast("Note added successfully");
    };

    return (
        <RouteGuard>
            <div className="min-h-screen bg-slate-100 pb-40">
                {isLoading ? (
                    <div className="flex items-center justify-center h-[80vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <>
                        {toastMessage && (
                            <div className="fixed top-20 right-5 bg-slate-800 text-white px-4 py-2 rounded shadow-lg z-50 animate-bounce">
                                {toastMessage}
                            </div>
                        )}

                        <LiveActionBar
                            hotCount={hotLeadsCount}
                            warmCount={warmLeadsCount}
                            convertedCount={convertedLeadsCount}
                            attentionCount={attentionCount}
                        />

                        <div className="max-w-6xl mx-auto p-4 space-y-4 md:space-y-6 mt-4">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 space-y-6">
                                    <HeroClient
                                        clients={activeLeads}
                                        onMarkDone={handleMarkDone}
                                        onSnooze={handleSnooze}
                                    />
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                                        <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                                            <LayoutDashboard className="text-indigo-600" size={20} />
                                            Portfolio Workload Distribution
                                        </h2>
                                        <div className="h-[250px]">
                                            <WorkloadChart clients={activeLeads} />
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-1">
                                    <SmartInsights
                                        delayedCount={delayedLeadsCount}
                                        opportunityCount={activeWarmLeadsCount}
                                        replyRate={replyRate}
                                    />
                                </div>
                            </div>

                            <ActionStream
                                clients={activeLeads}
                                onMarkDone={handleMarkDone}
                                onSnooze={handleSnooze}
                            />
                        </div>

                        <QuickActions
                            onCallNext={handleCallNext}
                            onWhatsAppQueue={handleWhatsAppQueue}
                            onLogNote={handleLogNote}
                        />
                    </>
                )}
            </div>
        </RouteGuard>
    );
}
