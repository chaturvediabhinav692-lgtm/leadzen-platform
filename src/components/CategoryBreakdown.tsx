'use client';

import { useStore } from '@/lib/store';
import { ClientCategory } from '@/lib/mockData';
import { Landmark, Home, Building2, Building, Search } from 'lucide-react';

const icons: Record<string, any> = {
    '2BHK Flat': Home,
    '3BHK Luxury': Building2,
    'Penthouse': Building,
    'Villa': Home,
    'Commercial Plot': Landmark,
};

const colors: Record<string, string> = {
    '2BHK Flat': 'bg-blue-100 text-blue-700',
    '3BHK Luxury': 'bg-green-100 text-green-700',
    'Penthouse': 'bg-purple-100 text-purple-700',
    'Villa': 'bg-orange-100 text-orange-700',
    'Commercial Plot': 'bg-pink-100 text-pink-700'
};

export default function CategoryBreakdown() {
    const { clients } = useStore();

    // Aggregate counts
    const breakdown = clients.reduce((acc, client) => {
        const cat = client.category as string;
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const categories = Object.keys(breakdown);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Leads by Category</h3>

            <div className="space-y-4">
                {categories.map(cat => {
                    const count = breakdown[cat];
                    const percentage = ((count / clients.length) * 100).toFixed(0);
                    const Icon = icons[cat] || Search;
                    const colorClasses = colors[cat] || 'bg-slate-100 text-slate-700';

                    return (
                        <div key={cat} className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-md ${colorClasses}`}>
                                        <Icon size={14} />
                                    </div>
                                    <span className="font-medium text-slate-700">{cat}</span>
                                </div>
                                <span className="text-slate-500 font-medium">{count} ({percentage}%)</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-current opacity-20"
                                    style={{ width: `${percentage}%` }}
                                />
                                <div
                                    className={`h-full rounded-full -mt-2 ${colorClasses.split(' ')[0]}`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
