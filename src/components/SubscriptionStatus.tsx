'use client';

import { useAuth } from '@/context/AuthContext';
import { Clock, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function SubscriptionStatus() {
    const { user } = useAuth();

    if (!user || user.role === 'admin') return null;

    const subscriptionEnd = user.subscriptionEnd ? new Date(user.subscriptionEnd) : null;
    const isExpired = subscriptionEnd ? new Date() > subscriptionEnd : false;

    const daysLeft = subscriptionEnd
        ? Math.ceil((subscriptionEnd.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    const getStatusColor = () => {
        if (isExpired || daysLeft <= 0) return 'text-red-500 bg-red-500/10 border-red-500/20';
        if (daysLeft <= 3) return 'text-red-400 bg-red-400/10 border-red-400/20';
        if (daysLeft <= 7) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
        return 'text-green-500 bg-green-500/10 border-green-500/20';
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="flex flex-wrap gap-4 items-center">
            {/* Plan Card */}
            <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 flex items-center gap-4 shadow-sm min-w-[200px]">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Current Plan</p>
                    <p className="font-bold text-slate-900 capitalize">{user.plan || 'Starter'}</p>
                </div>
            </div>

            {/* Expiry Card */}
            <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 flex items-center gap-4 shadow-sm min-w-[240px]">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Expires On</p>
                    <p className="font-bold text-slate-900">
                        {subscriptionEnd ? formatDate(subscriptionEnd) : 'N/A'}
                    </p>
                </div>
                <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getStatusColor()}`}>
                    {isExpired ? 'Expired' : `${daysLeft}d left`}
                </div>
            </div>

            {/* Expired Warning Overlay (Triggered in layout if needed) */}
            {isExpired && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-red-100 shadow-2xl text-center space-y-6">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
                            <AlertTriangle className="w-10 h-10" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Subscription Expired</h2>
                            <p className="text-slate-500 font-medium">Your access to the Leadzen dashboard has been suspended. Renew your plan to continue managing your leads.</p>
                        </div>
                        <div className="pt-4 space-y-3">
                            <button className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-purple-500/20 hover:bg-purple-700 transition-all active:scale-95">
                                Renew Growth Plan
                            </button>
                            <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
