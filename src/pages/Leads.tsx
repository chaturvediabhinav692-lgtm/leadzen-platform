import { useState, useMemo } from 'react';
import { LeadStatus } from '@/modules/leads/types';
import { 
  Search,
  UserPlus, X, Loader2
} from 'lucide-react';
import LeadContactActions from '@/components/LeadContactActions';
import { useLeads } from '@/modules/leads/hooks/useLeads';
import { BackendUnavailable } from '@/components/BackendUnavailable';
import { sanitizeHtml } from '@/utils/sanitization';
import { toast } from 'sonner';
import { useAuth } from '@/modules/auth/context/AuthContext';

// ─── MANUAL INTAKE MODAL ────────────────────────────────────────────────────────
function ManualIntakeModal({ onClose }: { onClose: () => void }) {
  const { createLead, isCreating } = useLeads();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', courseInterest: '', company: '', telegramUsername: '', status: 'new' as LeadStatus
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return toast.error('Name and Phone are required');
    
    try {
      const res = await createLead(form);
      if (res.success) {
        toast.success(`Lead "${sanitizeHtml(form.name)}" created successfully`);
        onClose();
      } else {
        toast.error(res.error || 'Failed to create lead');
      }
    } catch {
      toast.error('Network failure creating lead');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div 
        className="relative w-full max-w-lg rounded-[2.5rem] glass-dark border border-white/10 p-10 animate-fade-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Manual Intake</h2>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Register a new prospect</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Full Name *</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Vikram Malhotra" className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Phone *</label>
              <input type="text" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^0-9+]/g, '') })}
                placeholder="919876543210" className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="vikram@corp.in" className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Property Interest</label>
              <input type="text" value={form.courseInterest} onChange={(e) => setForm({ ...form, courseInterest: e.target.value })}
                placeholder="3BHK Prestige" className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Company</label>
              <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="PropertyCorp" className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Telegram @</label>
              <input type="text" value={form.telegramUsername} onChange={(e) => setForm({ ...form, telegramUsername: e.target.value })}
                placeholder="username" className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Initial Status</label>
            <div className="flex gap-2 flex-wrap">
              {(['new', 'hot', 'warm', 'cold'] as LeadStatus[]).map((s) => (
                <button key={s} type="button" onClick={() => setForm({ ...form, status: s })}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                    form.status === s ? 'bg-white text-black border-white' : 'bg-white/5 text-white/30 border-white/5 hover:border-white/10'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={isCreating}
            className="w-full py-4 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all disabled:opacity-30 flex items-center justify-center gap-3">
            {isCreating ? <><Loader2 size={16} className="animate-spin" /> PROCESSING...</> : 'CREATE LEAD'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── MAIN LEADS PAGE ────────────────────────────────────────────────────────────

export default function Leads() {
  const { leads, isLoading, error, refetch, updateStatus, isUpdating } = useLeads();
  const { user: currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [showIntake, setShowIntake] = useState(false);

  const filteredLeads = useMemo(() => {
    return (leads || []).filter(lead => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery) ||
        (lead.email || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  const handleStatusUpdate = async (id: string, newStatus: LeadStatus) => {
    if (currentUser?.role !== 'admin') {
      return toast.error('Security Restriction: Admin level required for status modification');
    }
    try {
      const res = await updateStatus({ id, status: newStatus });
      if (res.success) toast.success(`Lead marked as ${newStatus}`);
      else toast.error(res.error || 'Failed to update status');
    } catch {
      toast.error('Connection failure during sync');
    }
  };

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case 'hot': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'warm': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'cold': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      case 'converted': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'assigned': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'new': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'snoozed': return 'bg-slate-500/5 text-slate-500 border-slate-500/10';
      case 'rejected': return 'bg-red-900/10 text-red-900 border-red-900/20';
      default: return 'bg-white/5 text-white/40 border-white/5';
    }
  };

  if (error) return <BackendUnavailable onRetry={() => refetch()} message={error.message} />;

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse pb-24">
        <div className="h-12 w-48 bg-white/5 rounded-2xl" />
        <div className="h-16 w-full bg-white/5 rounded-[2rem]" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-24 w-full bg-white/5 rounded-[2rem]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-24">
      {showIntake && <ManualIntakeModal onClose={() => setShowIntake(false)} />}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-white uppercase tracking-tighter">Leads Matrix</h1>
          <p className="text-sm text-white/40 uppercase tracking-[0.2em] font-bold pl-0.5">High-velocity prospect queue</p>
        </div>
        {currentUser?.role === 'admin' && (
          <button 
            onClick={() => setShowIntake(true)}
            disabled={isLoading}
            className="px-6 py-3 rounded-2xl bg-white text-black font-black flex items-center gap-3 text-xs tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-white/5 hover:scale-105 active:scale-95 disabled:opacity-50"
          >
             <UserPlus size={18} />
             Manual Intake
          </button>
        )}
      </header>

      {/* Filters Bar */}
      <div className="p-4 rounded-[2.5rem] glass-dark border border-white/5 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full">
           <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" />
           <input 
             type="text" 
             placeholder="Search by name, phone, or email..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
           />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
           {['all', 'hot', 'warm', 'cold', 'converted', 'assigned'].map((status) => (
             <button
               key={status}
               onClick={() => setStatusFilter(status as any)}
               className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                 statusFilter === status 
                   ? 'bg-white text-black border-white' 
                   : 'bg-white/5 text-white/40 border-white/5 hover:border-white/10'
               }`}
             >
               {status}
             </button>
           ))}
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => (
            <div 
              key={lead.id} 
              className="p-6 rounded-[2.5rem] glass-dark border border-white/5 hover:border-white/10 transition-all group flex flex-col md:flex-row items-center gap-8"
            >
              <div className="flex items-center gap-6 flex-1 min-w-0 w-full">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black text-white shrink-0">
                    {lead.name[0]}
                 </div>
                 <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-black text-white uppercase tracking-tight truncate group-hover:text-emerald-400 transition-colors"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(lead.name) }} />
                    <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                       <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(lead.status)}`}>
                         {lead.status}
                       </span>
                       <span className="text-[10px] font-bold text-white/20 uppercase tracking-tighter"
                             dangerouslySetInnerHTML={{ __html: sanitizeHtml(lead.courseInterest) }} />
                       {lead.company && <span className="text-[10px] font-bold text-white/10 uppercase tracking-tighter hidden sm:block"
                             dangerouslySetInnerHTML={{ __html: `@ ${sanitizeHtml(lead.company)}` }} />}
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-center">
                 <LeadContactActions 
                   phone={lead.phone} 
                   email={lead.email} 
                   name={lead.name} 
                   telegramUsername={lead.telegramUsername} 
                 />
                 
                 <div className="h-6 w-px bg-white/5 mx-2" />
                 
                 <div className="relative">
                   <select 
                     value={lead.status}
                     disabled={isUpdating}
                     onChange={(e) => handleStatusUpdate(lead.id, e.target.value as LeadStatus)}
                     className="bg-white/5 border border-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest px-4 py-2 rounded-xl focus:outline-none focus:border-white/20 cursor-pointer hover:text-white transition-colors disabled:opacity-50"
                   >
                      <option value="new" className="bg-slate-900">New</option>
                      <option value="hot" className="bg-slate-900">Hot</option>
                      <option value="warm" className="bg-slate-900">Warm</option>
                      <option value="cold" className="bg-slate-900">Cold</option>
                      <option value="converted" className="bg-slate-900">Converted</option>
                      <option value="assigned" className="bg-slate-900">Assigned</option>
                      <option value="rejected" className="bg-slate-900">Rejected</option>
                   </select>
                   {isUpdating && <Loader2 size={10} className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-white/20" />}
                 </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-96 flex flex-col items-center justify-center space-y-6 animate-fade-in">
             <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 flex items-center justify-center text-white/10 border border-white/5">
                <Search size={40} />
             </div>
             <div className="text-center space-y-2">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                  {leads.length === 0 ? 'QUANTUM VOID DETECTED' : 'FILTER RETURNED NO MATCHES'}
                </p>
                <p className="text-[9px] font-bold text-white/10 uppercase tracking-widest max-w-xs mx-auto">
                  {leads.length === 0 
                    ? 'No leads have been ingested into your local node yet. Use the Data Upload terminal to begin.' 
                    : 'Try adjusting your search parameters or clearing filters to locate specific identities.'}
                </p>
             </div>
             {leads.length > 0 && (
               <button 
                 onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                 className="px-6 py-3 rounded-xl bg-white/5 text-white/40 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
               >
                  Reset Parameters
               </button>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
