'use client';

import { useStore } from '@/lib/store';
import { ClientCategory } from '@/lib/mockData';
import { BookOpen, Stethoscope, Landmark, Briefcase, Calculator } from 'lucide-react';

const icons: Record<ClientCategory, React.ElementType> = {
    JEE: Calculator,
    NEET: Stethoscope,
    UPSC: Landmark,
    SSC: Briefcase,
    Commerce: BookOpen
};

const colors: Record<ClientCategory, string> = {
    JEE: 'bg-blue-100 text-blue-700',
    NEET: 'bg-green-100 text-green-700',
    UPSC: 'bg-purple-100 text-purple-700',
    SSC: 'bg-orange-100 text-orange-700',
    Commerce: 'bg-pink-100 text-pink-700'
};

export default function CategoryBreakdown() {
    const { clients } = useStore();

    // Aggregate counts
    const breakdown = clients.reduce((acc, client) => {
        acc[client.category] = (acc[client.category] || 0) + 1;
        return acc;
    }, {} as Record<ClientCategory, number>);

    const categories = Object.keys(breakdown) as ClientCategory[];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Leads by Category</h3>

            <div className="space-y-4">
                {categories.map(cat => {
                    const count = breakdown[cat];
                    const percentage = ((count / clients.length) * 100).toFixed(0);
                    const Icon = icons[cat] || BookOpen;

                    return (
                        <div key={cat} className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-md ${colors[cat]}`}>
                                        <Icon size={14} />
                                    </div>
                                    <span className="font-medium text-slate-700">{cat}</span>
                                </div>
                                <span className="text-slate-500 font-medium">{count} ({percentage}%)</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${colors[cat].split(' ')[0].replace('bg-', 'bg-')}`}
                                    // Note: simple hack to get the dark version of bg color for the bar
                                    // better to just map valid bg colors. 
                                    style={{ width: `${percentage}%`, backgroundColor: 'currentColor' }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
