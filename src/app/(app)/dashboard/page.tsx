'use client';

import BusinessLayout from '@/layouts/BusinessLayout';
import BusinessMetrics from '@/components/BusinessMetrics';
import HotLeadsPanel from '@/components/business/HotLeadsPanel';
import LeadQualityBreakdown from '@/components/business/LeadQualityBreakdown';
import RecentConversations from '@/components/business/RecentConversations';
import ProfessionalPerformanceTable from '@/components/business/ProfessionalPerformanceTable';
import MissedOpportunities from '@/components/business/MissedOpportunities';
import RouteGuard from '@/components/layout/RouteGuard';
import WorkloadChart from '@/components/analytics/WorkloadChart';
import ActionLoadPanel from '@/components/analytics/ActionLoadPanel';
import { useStore } from '@/lib/store';

export default function DashboardPage() {
    const { clients } = useStore();

    return (
        <RouteGuard>
            <BusinessLayout
                title="Leadzen Command Center"
                subtitle="Real-time visibility into your operational pipeline."
            >
                {/* 2. Business Metrics (Top Row) */}
                <BusinessMetrics />

                {/* GAL 2: Action Load Panel */}
                <ActionLoadPanel clients={clients} />

                {/* Workload Analytics to the side or top? 
                    User said "Below top metrics row, Above Hot Leads".
                    Let's put it as a full width section or part of the grid? 
                    The grid below is 3 columns.
                    If we add it here, it will be above the 3-col grid.
                    But WorkloadChart might look better if it's not full-width? 
                    Actually, let's put it in a new grid row. 
                    Let's make a split: 2/3 Action Panel (already full width), 1/3 Workload?
                    User said "Add this component inside... Below top metrics row -> Above Hot Leads".
                */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Workload Distribution</h3>
                                <p className="text-sm text-slate-500">Current operational pressure across all leads</p>
                            </div>
                            <div className="flex-grow">
                                <WorkloadChart clients={clients} />
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        {/* Placeholder or move MissedOpportunities here? 
                             Let's leave it blank/flexible for now or stretch chart.
                             Actually, let's make WorkloadChart take 1 col and maybe something else?
                             Let's just put WorkloadChart in a clean container.
                         */}
                        <div className="bg-slate-100 rounded-xl h-full flex items-center justify-center border-2 border-dashed border-slate-300">
                            <p className="text-slate-400 font-bold">Additional Widgets</p>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* Left Column: Immediate Attention */}
                    <div className="xl:col-span-1 space-y-8">
                        {/* 1. Hot Leads Panel (Top Priority) */}
                        <HotLeadsPanel />

                        {/* 6. Missed Opportunities (Important) */}
                        <MissedOpportunities />

                        {/* 3. Lead Quality Breakdown */}
                        <LeadQualityBreakdown />
                    </div>

                    {/* Middle Column: Conversations Feed */}
                    <div className="xl:col-span-1 space-y-8">
                        <RecentConversations />
                    </div>

                    {/* Right Column: Performance */}
                    <div className="xl:col-span-1 space-y-8">
                        <ProfessionalPerformanceTable />
                    </div>
                </div>
            </BusinessLayout>
        </RouteGuard>
    );
}
