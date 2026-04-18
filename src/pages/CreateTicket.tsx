import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTickets } from '@/modules/tickets/hooks/useTickets';

export default function CreateTicket() {
  const navigate = useNavigate();
  const { createTicket, isCreating } = useTickets();
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    issueType: 'technical' as 'technical' | 'billing' | 'feature' | 'other'
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await createTicket(formData);
      if (res.success) {
        navigate('/support');
      } else {
        setError(res.error || 'Failed to create ticket.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12 animate-fade-in pb-24">
      <header className="space-y-4">
        <Link to="/support" className="inline-flex items-center gap-2 text-[10px] font-bold text-white/30 hover:text-white uppercase tracking-widest transition-colors mb-4">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          BACK TO SUPPORT
        </Link>
        <h1 className="text-4xl font-bold tracking-tight text-white uppercase">Raise Ticket</h1>
        <p className="text-sm text-white/40 uppercase tracking-widest pl-0.5 font-medium">Describe your issue in detail</p>
      </header>

      <form onSubmit={handleSubmit} className="p-10 rounded-[3rem] glass-dark border border-white/5 space-y-8 shadow-2xl relative">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] pl-1">Ticket Subject</label>
            <input
              type="text"
              required
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-white/20 transition-all font-bold placeholder:text-white/20"
              placeholder="e.g. Issues with Lead Exports"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] pl-1">Priority Level</label>
            <div className="grid grid-cols-3 gap-3">
              {(['low', 'medium', 'high'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: p })}
                  className={`py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                    formData.priority === p 
                      ? 'bg-white text-black border-white' 
                      : 'border-white/5 bg-white/5 text-white/30 hover:border-white/10 hover:text-white/60'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] pl-1">Problem Description</label>
            <textarea
              required
              rows={6}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-white/20 transition-all font-medium placeholder:text-white/20 resize-none text-sm leading-relaxed"
              placeholder="Provide as much detail as possible..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isCreating}
          className={`w-full py-5 rounded-2xl bg-white text-black font-black text-lg transition-all shadow-xl shadow-white/5 hover:bg-white/90 active:scale-[0.98] ${
            isCreating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isCreating ? 'SENDING TICKET...' : 'RAISE TICKET NOW'}
        </button>
        
        <p className="text-[10px] text-center text-white/20 font-bold uppercase tracking-widest">Typical response time: 2-4 hours</p>
      </form>
    </div>
  );
}
