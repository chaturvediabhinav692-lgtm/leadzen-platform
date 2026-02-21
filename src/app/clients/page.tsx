import ClientTable from '@/components/ClientTable';

export default function ClientsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Client Management</h2>
                <p className="text-slate-500">View and manage all your leads</p>
            </div>
            <ClientTable />
        </div>
    );
}
