import { useState, useMemo } from 'react';
import { useUsers } from '@/modules/users/hooks/useUsers';
import { BackendUnavailable } from '@/components/BackendUnavailable';
import { 
  Users, 
  Search, 
  Mail, 
  ShieldCheck, 
  Shield, 
  MoreHorizontal,
  RefreshCw,
  SearchX,
  Loader2
} from 'lucide-react';

export default function AdminUsers() {
  const { users, isLoading, error, refetch } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.role || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  if (error) return <BackendUnavailable onRetry={() => refetch()} message={error.message} />;

  if (isLoading && users.length === 0) {
    return (
      <div className="space-y-12 animate-pulse pb-24">
        <div className="h-16 w-64 bg-white/5 rounded-2xl" />
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-24 w-full bg-white/5 rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-red-500 mb-2">
            <Users size={24} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-500/60">Global User Registry</span>
          </div>
          <h1 className="text-6xl font-black tracking-tight text-white uppercase">User Pool</h1>
          <p className="text-white/30 text-sm uppercase tracking-widest font-bold">Authenticated Identity Infrastructure</p>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative group flex-1 lg:flex-none">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
            <input 
              type="text" 
              placeholder="Search Identity / Role / Email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-6 py-5 rounded-3xl bg-white/[0.03] border border-white/5 text-[10px] font-black text-white focus:outline-none focus:border-red-500/30 transition-all w-full lg:w-96 uppercase tracking-widest"
            />
          </div>
          <button 
            onClick={() => refetch()}
            disabled={isLoading}
            className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={24} className="animate-spin" /> : <RefreshCw size={24} />}
          </button>
        </div>
      </header>

      {/* User Table */}
      <section className="overflow-x-auto rounded-[4rem] border border-white/5 bg-white/[0.01] shadow-2xl">
        <table className="w-full text-left min-w-[1000px]">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.01]">
              <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">IDENTITY</th>
              <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">COMMUNICATION</th>
              <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">SECURITY PRIVILEGE</th>
              <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 text-right">OPERATIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="group hover:bg-red-500/[0.02] transition-colors">
                <td className="px-12 py-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs text-white/40 group-hover:bg-red-500 group-hover:text-white transition-all">
                      {user.name?.[0] || 'U'}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-white uppercase tracking-tight group-hover:text-red-400 transition-colors">{user.name}</p>
                      <p className="text-[10px] font-black text-white/10 uppercase tracking-tighter">UID: {user.id.slice(0, 12)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-12 py-10">
                   <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors">
                      <Mail size={14} className="opacity-40" />
                      <p className="text-xs font-bold lowercase tracking-tight">{user.email}</p>
                   </div>
                </td>
                <td className="px-12 py-10">
                   <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                     user.role === 'admin' 
                      ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                      : 'bg-white/5 border-white/5 text-white/30'
                   }`}>
                      {user.role === 'admin' ? <ShieldCheck size={12} /> : <Shield size={12} />}
                      {user.role}
                   </div>
                </td>
                <td className="px-12 py-10 text-right">
                   <button 
                     className="p-3 rounded-xl bg-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20"
                   >
                      <MoreHorizontal size={16} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="p-40 text-center space-y-8 animate-fade-in">
             <div className="w-24 h-24 rounded-[3rem] bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/5">
                <SearchX size={48} className="text-white/10" />
             </div>
             <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em]">IDENTITY NOT FOUND IN SYSTEM POOL</p>
          </div>
        )}
      </section>
    </div>
  );
}
