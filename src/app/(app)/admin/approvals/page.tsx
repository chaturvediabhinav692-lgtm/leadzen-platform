'use client';

import RouteGuard from '@/components/layout/RouteGuard';
import { useStore } from '@/lib/store';
import { UserCheck, UserX, User, Mail, Phone, Building2, MapPin, Search } from 'lucide-react';
import { useState } from 'react';

export default function AccountApprovalsPage() {
    const { users, approveUser, rejectUser } = useStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const pendingUsers = users.filter(u => u.status === 'pending' && (
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    ));

    const handleApprove = (id: string) => {
        approveUser(id);
    };

    const handleReject = (id: string) => {
        rejectUser(id);
    };

    const handleView = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    return (
        <RouteGuard>
            <div className="max-w-7xl mx-auto space-y-8 pb-32 px-4 sm:px-0">
                {/* Header omitted for brevity in target content selection */}
                {/* ... existing code ... */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4">User Details</th>
                                    <th className="px-6 py-4">Profession</th>
                                    <th className="px-6 py-4">Business Info</th>
                                    <th className="px-6 py-4">Subscription</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {pendingUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-20 text-center">
                                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No pending approvals</p>
                                        </td>
                                    </tr>
                                ) : (
                                    pendingUsers.map(user => (
                                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                                                        <User className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-900 text-sm">{user.name}</span>
                                                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                                            <Mail className="w-3 h-3" />
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-[10px] font-black uppercase rounded-lg ${user.role === 'coaching' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                                                    }`}>
                                                    {user.profession || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                                                        <Building2 className="w-3 h-3 text-slate-400" />
                                                        {user.businessName}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase text-purple-600 tracking-wider">{user.plan || 'TBD'}</span>
                                                    <span className="text-[10px] text-slate-500 font-bold">
                                                        {user.subscriptionEnd ? new Date(user.subscriptionEnd).toLocaleDateString() : 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleView(user)}
                                                        className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-all active:scale-95"
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        onClick={() => handleApprove(user.id)}
                                                        className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-all active:scale-95"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(user.id)}
                                                        className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500/20 transition-all active:scale-95"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Rejection Note */}
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-orange-600 font-bold">!</span>
                    </div>
                    <p className="text-[11px] text-orange-700 font-medium leading-relaxed">
                        <span className="font-bold uppercase tracking-wider block mb-1 underline">Security Protocol</span>
                        Once approved, users will gain immediate access to their respective dashboards (Coaching or Broker). Rejected users will be permanently blocked from accessing the system using their registered credentials.
                    </p>
                </div>
            </div>

            {/* Registration Details Modal */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100 bg-white">
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Registration Details</h2>
                            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-black">Audit Preview</p>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4 bg-white">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</p>
                                    <p className="text-sm font-bold text-slate-900">{selectedUser.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                                    <span className="px-2 py-0.5 text-[10px] font-black bg-orange-50 text-orange-600 border border-orange-100 rounded-md uppercase">
                                        {selectedUser.status}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                                <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Mail className="w-3 h-3 text-slate-400" />
                                    {selectedUser.email}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                                <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Phone className="w-3 h-3 text-slate-400" />
                                    {selectedUser.phone || 'N/A'}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry/Profession</p>
                                    <p className="text-sm font-bold text-slate-900">{selectedUser.profession || "Professional"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">City</p>
                                    <p className="text-sm font-bold text-slate-700">{selectedUser.city || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan Tier</p>
                                    <p className="text-sm font-bold text-purple-600 uppercase tracking-wider">{selectedUser.plan || "Growth"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expiry Date</p>
                                    <p className="text-sm font-bold text-slate-900">
                                        {selectedUser.subscriptionEnd ? new Date(selectedUser.subscriptionEnd).toLocaleDateString() : '30 Days Post-Approve'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-1 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Business Organization</p>
                                <p className="text-sm font-bold text-slate-900 border-l-2 border-purple-500 pl-3 py-1">
                                    {selectedUser.businessName}
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 bg-slate-50/50 border-t border-gray-100 flex items-center justify-between gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
                            >
                                Close Entry
                            </button>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        handleReject(selectedUser.id);
                                        setIsModalOpen(false);
                                    }}
                                    className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-white text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-all active:scale-95"
                                >
                                    Reject
                                </button>
                                <button
                                    onClick={() => {
                                        handleApprove(selectedUser.id);
                                        setIsModalOpen(false);
                                    }}
                                    className="px-6 py-2 text-[10px] font-black uppercase tracking-widest bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all active:scale-95 shadow-lg shadow-green-500/20"
                                >
                                    Quick Approve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </RouteGuard>
    );
}
