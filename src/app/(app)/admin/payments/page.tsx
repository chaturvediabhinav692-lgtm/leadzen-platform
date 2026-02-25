'use client';

import RouteGuard from '@/components/layout/RouteGuard';
import { useStore } from '@/lib/store';
import { DollarSign, CreditCard, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { REVENUE_DATA } from '@/lib/adminData';

export default function AdminPaymentsPage() {
    const { payments, platformClients } = useStore();

    // Stats
    const totalRevenue = platformClients.reduce((acc, curr) => acc + curr.revenue, 0);
    const paidCount = payments.filter(p => p.status === 'Paid').length;
    const pendingCount = payments.filter(p => p.status === 'Pending').length;

    return (
        <RouteGuard>
            <div className="max-w-7xl mx-auto space-y-8 pb-20">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Revenue & Payments</h1>
                    <p className="text-slate-500 mt-1">Financial overview of the platform.</p>
                </div>

                {/* Top Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Total MRR</p>
                            <p className="text-3xl font-black text-slate-900">₹{totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="p-3 rounded-full bg-green-50 text-green-600">
                            <DollarSign size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Paid Transactions</p>
                            <p className="text-3xl font-black text-blue-600">{paidCount}</p>
                        </div>
                        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                            <CreditCard size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Pending Payments</p>
                            <p className="text-3xl font-black text-orange-600">{pendingCount}</p>
                        </div>
                        <div className="p-3 rounded-full bg-orange-50 text-orange-600">
                            <AlertCircle size={24} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Revenue Graph */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-6">Revenue Trend</h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Mini List or Info */}
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                        <h4 className="font-bold text-slate-800 mb-2">Payment Insights</h4>
                        <p className="text-sm text-slate-600 mb-4">Most revenue comes from <strong>Enterprise</strong> plans.</p>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Enterprise</span>
                                <span className="font-bold text-slate-800">60%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Pro</span>
                                <span className="font-bold text-slate-800">35%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Starter</span>
                                <span className="font-bold text-slate-800">5%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction Table */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800">Recent Transactions</h3>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Client Name</th>
                                <th className="px-6 py-4">Plan</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {payments.map(payment => (
                                <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-800">{payment.clientName}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{payment.plan}</td>
                                    <td className="px-6 py-4 font-mono text-slate-700">₹{payment.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${payment.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                            payment.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm text-slate-500" suppressHydrationWarning>{new Date(payment.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </RouteGuard>
    );
}
