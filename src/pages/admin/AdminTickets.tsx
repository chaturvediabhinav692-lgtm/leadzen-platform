import { useState, useMemo } from 'react';
import { useTickets } from '@/modules/tickets/hooks/useTickets';
import { Ticket } from '@/modules/tickets/types';
import { BackendUnavailable } from '@/components/BackendUnavailable';
import { Search, CheckCircle, Clock, ShieldAlert, RefreshCw, XCircle, SearchX, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminTickets() {
  const { tickets, isLoading, error, refetch, updateStatus, isUpdating } = useTickets();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusUpdate = async (id: string, newStatus: Ticket['status']) => {
    try {
      const res = await updateStatus({ id, status: newStatus });
      if (res.success) {
        toast.success(`System Token: ${newStatus.toUpperCase()}`);
      } else {
        toast.error(res.error || 'GSP Synchronization Failed');
      }
    } catch {
      toast.error('GSP Synchronization Failed');
    }
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
      const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.userEmail || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [tickets, statusFilter, priorityFilter, searchQuery]);

  if (error) return <BackendUnavailable onRetry={() => refetch()} message={error.message} />;

  if (isLoading && tickets.length === 0) {
    return (
      <div className="space-y-12 animate-pulse pb-24">
        <div className="h-16 w-64 bg-white/5 rounded-2xl" />
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-32 w-full bg-white/5 rounded-[2.5rem]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-red-500 mb-2">
            <ShieldAlert size={24} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-500/60">Global Incident Node 0-C</span>
          </div>
          <h1 className="text-6xl font-black tracking-tight text-white uppercase">Ticket Matrix</h1>
          <p className="text-white/30 text-sm uppercase tracking-widest font-bold">System-Wide Response Management Terminal</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="relative group flex-1 lg:flex-none">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
            <input 
              type="text" 
              placeholder="Search Subject / ID / Identity..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-6 py-5 rounded-3xl bg-white/[0.03] border border-white/5 text-[10px] font-black text-white focus:outline-none focus:border-red-500/30 transition-all w-full lg:w-96 uppercase tracking-widest"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-6 py-5 rounded-3xl bg-white/[0.03] border border-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest focus:outline-none focus:border-red-500/30 cursor-pointer"
          >
            <option value="all">ALL STATUS</option>
            <option value="open">OPEN</option>
            <option value="in-progress">ACTIVE</option>
            <option value="resolved">RESOLVED</option>
            <option value="closed">CLOSED</option>
          </select>

          <button 
            onClick={() => refetch()}
            disabled={isLoading}
            className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <RefreshCw size={20} />}
          </button>
        </div>
      </header>

      {/* Admin Interface Table */}
      <section className="overflow-x-auto rounded-[4rem] border border-white/5 bg-white/[0.01] shadow-2xl relative">
        <table className="w-full text-left min-w-[1200px]">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.01]">
              <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">TOKEN ID</th>
              <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 text-center">SEVERITY</th>
              <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 text-center">OPR STATUS</th>
              <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">IDENTITY</th>
              <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 text-right">TELEMETRY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="group hover:bg-red-500/[0.02] transition-colors">
                <td className="px-12 py-10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-white/10 uppercase tracking-tighter">#{ticket.id.slice(-8).toUpperCase()}</span>
                      <h3 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-red-400 transition-colors">{ticket.subject}</h3>
                    </div>
                    <p className="text-[10px] text-white/20 font-bold tracking-tight line-clamp-1 max-w-sm uppercase">
                      {ticket.description}
                    </p>
                  </div>
                </td>
                <td className="px-12 py-10 text-center">
                  <div className={`inline-block px-4 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest ${
                    ticket.priority === 'high' ? 'text-red-400 border-red-500/20 bg-red-500/5' :
                    ticket.priority === 'medium' ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' :
                    'text-blue-400 border-blue-500/20 bg-blue-500/5'
                  }`}>
                    {ticket.priority}
                  </div>
                </td>
                <td className="px-12 py-10 text-center">
                   <div className="inline-flex items-center rounded-[1.5rem] bg-white/5 p-1.5 border border-white/5">
                      {['open', 'in-progress', 'resolved', 'closed'].map((status) => (
                        <button 
                          key={status}
                          disabled={isUpdating}
                          onClick={() => handleStatusUpdate(ticket.id, status as any)}
                          className={`p-3 rounded-xl transition-all duration-300 disabled:opacity-20 ${
                            ticket.status === status 
                              ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] scale-110' 
                              : 'text-white/10 hover:text-white/40'
                          }`}
                          title={`Set as ${status.toUpperCase()}`}
                        >
                          {status === 'open' && <Clock size={16} />}
                          {status === 'in-progress' && <RefreshCw size={16} className={ticket.status === 'in-progress' ? 'animate-spin-slow' : ''} />}
                          {status === 'resolved' && <CheckCircle size={16} />}
                          {status === 'closed' && <XCircle size={16} />}
                        </button>
                      ))}
                   </div>
                </td>
                <td className="px-12 py-10">
                   <div className="space-y-1">
                     <p className="text-[10px] font-black text-white/60 lowercase tracking-tighter">{ticket.userEmail || 'ID_REDACTED@LEADZEN.IO'}</p>
                     {ticket.userName && (
                       <p className="text-[9px] text-white/10 font-bold uppercase tracking-[0.2em]">
                          USER: {ticket.userName}
                       </p>
                     )}
                   </div>
                </td>
                <td className="px-12 py-10 text-right">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                      {new Date(ticket.updatedAt).toLocaleDateString()}
                    </p>
                    <p className="text-[10px] text-white/10 font-black uppercase tracking-[0.2em]">
                       {new Date(ticket.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredTickets.length === 0 && (
          <div className="p-40 text-center space-y-8 animate-fade-in">
             <div className="w-24 h-24 rounded-[3rem] bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/5">
                <SearchX size={48} className="text-white/10" />
             </div>
             <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em]">FILTER RETURNED NO MATCHES IN GSP POOL</p>
          </div>
        )}
      </section>
    </div>
  );
}
