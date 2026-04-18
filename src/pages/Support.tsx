import { useState } from 'react';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { Ticket } from '@/modules/tickets/types';
import { useTickets } from '@/modules/tickets/hooks/useTickets';
import { BackendUnavailable } from '@/components/BackendUnavailable';
import { sanitizeHtml } from '@/utils/sanitization';
import { 
  Plus, 
  CheckCircle2, RefreshCw, Loader2, X, Clock, Tag, User, MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

// ─── TICKET DETAIL MODAL ────────────────────────────────────────────────────────
function TicketDetailModal({ ticket, onClose }: { ticket: Ticket; onClose: () => void }) {
  const getPriorityStyle = (p: string) => {
    switch (p) {
      case 'high': return 'text-red-400 border-red-500/20 bg-red-500/5';
      case 'medium': return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      default: return 'text-blue-400 border-blue-500/20 bg-blue-500/5';
    }
  };
  const getStatusStyle = (s: string) => {
    switch (s) {
      case 'resolved': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'in-progress': return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      case 'closed': return 'text-slate-400 border-slate-500/20 bg-slate-500/5';
      default: return 'text-blue-400 border-blue-500/20 bg-blue-500/5';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div 
        className="relative w-full max-w-2xl rounded-[2.5rem] glass-dark border border-white/10 p-10 animate-fade-in shadow-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-3 flex-1 pr-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-black text-white/10 uppercase tracking-tighter">#{ticket.id.slice(-6)}</span>
              <span className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${getPriorityStyle(ticket.priority)}`}>
                {ticket.priority}
              </span>
              <span className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${getStatusStyle(ticket.status)}`}>
                {ticket.status}
              </span>
            </div>
            <h2 className="text-lg font-black text-white uppercase tracking-tight"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(ticket.subject) }} />
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all shrink-0">
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { icon: Tag, label: 'Type', value: ticket.issueType },
            { icon: Clock, label: 'Created', value: ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : 'N/A' },
            { icon: User, label: 'Raised By', value: ticket.userName || 'Unknown' },
            { icon: MessageSquare, label: 'Last Update', value: new Date(ticket.updatedAt).toLocaleDateString() },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-white/20">
                <item.icon size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-tight">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-white/30 uppercase tracking-widest">Issue Description</h3>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-sm text-white/60 leading-relaxed font-medium"
               dangerouslySetInnerHTML={{ __html: sanitizeHtml(ticket.description) }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SUPPORT PAGE ──────────────────────────────────────────────────────────

export default function Support() {
  const { user } = useAuth();
  const { tickets, isLoading, error, refetch, createTicket, isCreating } = useTickets();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'medium' as Ticket['priority'],
    issueType: 'technical' as Ticket['issueType']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.subject.length < 5) return toast.error('Subject too brief');
    
    try {
      const res = await createTicket(formData);
      if (res.success) {
        toast.success('System ticket registered successfully');
        setShowCreateForm(false);
        setFormData({ subject: '', description: '', priority: 'medium', issueType: 'technical' });
      } else {
        toast.error(res.error || 'Submission failed');
      }
    } catch {
      toast.error('Sync failed during transmission');
    }
  };

  if (error) return <BackendUnavailable onRetry={() => refetch()} message={error.message} />;

  if (isLoading && tickets.length === 0) {
    return (
      <div className="space-y-12 animate-pulse pb-24">
        <div className="h-16 w-64 bg-white/5 rounded-2xl" />
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 w-full bg-white/5 rounded-[2.5rem]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      {selectedTicket && (
        <TicketDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}
      
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black tracking-tight text-white uppercase tracking-tighter">Support Node</h1>
          </div>
          <p className="text-sm text-white/40 uppercase tracking-[0.2em] font-bold pl-0.5">Global Response Interface</p>
        </div>
        
        {user?.role !== 'admin' && (
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 shadow-2xl shadow-white/5 hover:scale-105 active:scale-95 ${
              showCreateForm ? 'bg-white/10 text-white' : 'bg-white text-black'
            }`}
          >
            {showCreateForm ? 'Abort' : <><Plus size={16} strokeWidth={4} /> Raise Ticket</>}
          </button>
        )}
      </header>

      {showCreateForm && (
        <section className="p-10 rounded-[3rem] glass-dark border border-white/10 animate-fade-in relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl">
            <div className="grid sm:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Inquiry Type</label>
                <select 
                  value={formData.issueType}
                  onChange={(e) => setFormData({...formData, issueType: e.target.value as any})}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-white/20 transition-all cursor-pointer"
                >
                  <option value="technical" className="bg-slate-900">Technical</option>
                  <option value="billing" className="bg-slate-900">Billing</option>
                  <option value="feature" className="bg-slate-900">Enhancement</option>
                  <option value="other" className="bg-slate-900">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Priority Matrix</label>
                <select 
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-white/20 transition-all cursor-pointer"
                >
                  <option value="low" className="bg-slate-900">Low Impact</option>
                  <option value="medium" className="bg-slate-900">Medium Impact</option>
                  <option value="high" className="bg-slate-900">Critical Impact</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Brief Subject</label>
              <input 
                type="text" required
                placeholder="Core issue identifier..."
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-white tracking-widest focus:outline-none focus:border-white/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Telemetry Description</label>
              <textarea 
                required rows={4}
                placeholder="Describe parameters and anomalies..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-6 py-4 rounded-[2rem] bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all resize-none"
              />
            </div>

            <button 
              type="submit" disabled={isCreating}
              className="px-10 py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all disabled:opacity-20 flex items-center gap-3"
            >
              {isCreating ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              {isCreating ? 'Transmitting...' : 'Register Response Token'}
            </button>
          </form>
        </section>
      )}

      {tickets.length === 0 ? (
        <div className="p-32 rounded-[3.5rem] glass-dark border border-white/5 text-center flex flex-col items-center space-y-6">
           <div className="w-16 h-16 rounded-[2rem] bg-white/5 flex items-center justify-center text-white/10">
              <CheckCircle2 size={32} />
           </div>
           <div className="space-y-2">
             <h4 className="text-xl font-bold text-white/20 uppercase tracking-widest">NO ACTIVE ANOMALIES</h4>
             <p className="text-[10px] text-white/10 font-black uppercase tracking-[0.3em]">System health is currently nominal</p>
           </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-10 rounded-[3rem] glass-dark border border-white/5 hover:border-white/10 transition-all group flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
               <div className="flex-1 space-y-4 w-full">
                 <div className="flex flex-wrap items-center gap-4">
                   <span className="text-[10px] font-black text-white/10 uppercase tracking-tighter">#{ticket.id.slice(-6)}</span>
                   <h3 className="text-sm font-black text-white uppercase tracking-tight"
                       dangerouslySetInnerHTML={{ __html: sanitizeHtml(ticket.subject) }} />
                   <div className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${
                     ticket.priority === 'high' ? 'text-red-400 border-red-500/20 bg-red-500/5' :
                     ticket.priority === 'medium' ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' :
                     'text-blue-400 border-blue-500/20 bg-blue-500/5'
                   }`}>
                     {ticket.priority}
                   </div>
                 </div>
                 <p className="text-xs text-white/30 leading-relaxed font-bold uppercase tracking-tight line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(ticket.description) }} />
                 <div className="flex items-center gap-8 flex-wrap">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40">
                       <span className={`w-2 h-2 rounded-full ${
                         ticket.status === 'resolved' ? 'bg-emerald-500' :
                         ticket.status === 'in-progress' ? 'bg-amber-500 animate-pulse' :
                         ticket.status === 'open' ? 'bg-blue-500' : 'bg-white/10'
                       }`} />
                       {ticket.status}
                    </div>
                    {ticket.userName && (
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                        USER: {ticket.userName}
                      </p>
                    )}
                 </div>
               </div>
               
               <button 
                 onClick={() => setSelectedTicket(ticket)}
                 className="px-8 py-3 rounded-2xl bg-white/5 text-white/20 font-black text-[10px] uppercase tracking-[0.2em] group-hover:bg-white group-hover:text-black transition-all shrink-0 hover:scale-105 active:scale-95"
               >
                  VIEW TOKEN
               </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
