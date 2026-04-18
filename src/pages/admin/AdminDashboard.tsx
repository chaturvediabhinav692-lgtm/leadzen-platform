import { useMemo } from 'react';
import { useLeads, useLeadAnalytics } from '@/modules/leads/hooks/useLeads';
import { useTickets } from '@/modules/tickets/hooks/useTickets';
import { useUsers } from '@/modules/users/hooks/useUsers';
import { BackendUnavailable } from '@/components/BackendUnavailable';
import { 
  Users, 
  UserCheck, 
  Ticket as TicketIcon, 
  AlertCircle,
  TrendingUp,
  Activity,
  ShieldCheck,
  RefreshCw,
  Loader2
} from 'lucide-react';

export default function AdminDashboard() {
  const { leads, isLoading: leadsLoading, error: leadsError, refetch: refetchLeads } = useLeads();
  const { tickets, isLoading: ticketsLoading, error: ticketsError, refetch: refetchTickets } = useTickets();
  const { users, isLoading: usersLoading, error: usersError, refetch: refetchUsers } = useUsers();
  const { data: analytics } = useLeadAnalytics();

  const isLoading = leadsLoading || ticketsLoading || usersLoading;
  const error = leadsError || ticketsError || usersError;

  const stats = useMemo(() => ([
    { 
      label: 'Total Platform Users', 
      value: users.length.toLocaleString(), 
      icon: Users,
      trend: undefined as string | undefined,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    { 
      label: 'Global Leads Flow', 
      value: leads.length.toLocaleString(), 
      icon: UserCheck,
      trend: undefined as string | undefined,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10'
    },
    { 
      label: 'Active Tickets', 
      value: tickets.filter(t => t.status === 'open' || t.status === 'in-progress').length.toLocaleString(), 
      icon: TicketIcon,
      trend: undefined as string | undefined,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10'
    },
    { 
      label: 'Critical Incidents', 
      value: tickets.filter(t => t.priority === 'high' && t.status !== 'closed' && t.status !== 'resolved').length.toLocaleString(), 
      icon: AlertCircle,
      trend: undefined as string | undefined,
      color: 'text-red-400',
      bg: 'bg-red-400/10'
    }
  ]), [users, leads, tickets]);

  if (error) {
    return (
      <BackendUnavailable 
        onRetry={() => { refetchLeads(); refetchTickets(); refetchUsers(); }} 
        message={(error as Error).message} 
      />
    );
  }

  if (isLoading && leads.length === 0 && tickets.length === 0 && users.length === 0) {
    return (
      <div className="space-y-12 animate-pulse pb-24">
        <div className="h-12 w-64 bg-white/5 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-40 bg-white/5 rounded-[3rem]" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 h-96 bg-white/5 rounded-[4rem]" />
           <div className="h-96 bg-white/5 rounded-[4rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-red-500 mb-2">
            <ShieldCheck size={24} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-500/60">System Operational Status: Active Sync</span>
          </div>
          <h1 className="text-6xl font-black tracking-tight text-white uppercase">Terminal Hub</h1>
          <p className="text-white/30 text-sm uppercase tracking-widest font-bold">Global SaaS Infrastructure Management</p>
        </div>
        <button 
          onClick={() => { refetchLeads(); refetchTickets(); refetchUsers(); }}
          disabled={isLoading}
          className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
        >
          {isLoading ? <Loader2 size={24} className="animate-spin" /> : <RefreshCw size={24} />}
        </button>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="group p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-red-500/20 transition-all duration-500 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <div className="space-y-6 relative">
              <div className="flex items-center justify-between">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                {stat.trend && (
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-black">
                        <TrendingUp size={12} />
                        {stat.trend}
                    </div>
                    <p className="text-[8px] text-white/20 uppercase tracking-widest mt-1 font-bold">Last 24h</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Advanced Telemetry Panel Placeholder */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-12 rounded-[4rem] bg-white/[0.01] border border-white/5 flex flex-col justify-center items-center text-center space-y-6 min-h-[400px]">
           <div className="p-8 rounded-[2.5rem] bg-red-500/5 text-red-500/20">
              <Activity size={64} strokeWidth={1} />
           </div>
           <div>
             <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Live Infrastructure Feed</h3>
             <p className="text-xs text-white/20 uppercase tracking-widest font-bold">
               {analytics ? 'Analyzing data pattern...' : 'Connecting to global telemetry nodes...'}
             </p>
           </div>
        </div>

        <div className="p-10 rounded-[4rem] bg-white/[0.01] border border-white/5 space-y-8">
           <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] px-2">Critical Notifications</p>
           <div className="space-y-4">
              {tickets.filter(t => t.priority === 'high' && t.status !== 'closed' && t.status !== 'resolved').slice(0, 3).map((ticket, i) => (
                <div key={i} className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10 space-y-2 group cursor-pointer hover:bg-red-500/10 transition-colors">
                   <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black text-red-400 uppercase tracking-widest">Severity: HIGH</span>
                      <span className="text-[8px] text-white/20 uppercase tracking-widest">{new Date(ticket.createdAt || '').toLocaleDateString()}</span>
                   </div>
                   <p className="text-[10px] font-bold text-white uppercase truncate">{ticket.subject}</p>
                </div>
              ))}
              {tickets.filter(t => t.priority === 'high' && t.status !== 'closed' && t.status !== 'resolved').length === 0 && (
                <div className="p-12 text-center space-y-4">
                   <ShieldCheck size={32} className="mx-auto text-emerald-500 opacity-20" />
                   <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.4em]">All clear: No critical security threats</p>
                </div>
              )}
           </div>
        </div>
      </section>
    </div>
  );
}
