'use client';

import { useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import ClientInfoCard from '@/components/ClientInfoCard';
import ChatView from '@/components/ChatView';
import NotesSection from '@/components/NotesSection';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ClientDetailPage() {
    const params = useParams();
    const { getClientById, brokers } = useStore();

    const client = getClientById(params.id as string);

    if (!client) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold text-slate-900">Client Not Found</h2>
                <Link href="/clients" className="text-blue-600 hover:underline mt-4 inline-block">
                    Return to Client List
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-20">
            <Link href="/clients" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-medium">
                <ArrowLeft size={16} /> Back to Clients
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Info & Notes (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <ClientInfoCard client={client} brokers={brokers} />
                    <NotesSection clientId={client.id} initialNotes={client.notes} />
                </div>

                {/* Right Column: Chat Interface (8 cols) */}
                <div className="lg:col-span-8">
                    <ChatView client={client} />
                </div>
            </div>
        </div>
    );
}
