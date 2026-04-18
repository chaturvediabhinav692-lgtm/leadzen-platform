import { useAuth } from '@/modules/auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Mail, Shield, Calendar, ArrowLeft } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      <header className="space-y-1">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 text-[10px] font-bold text-white/30 hover:text-white uppercase tracking-widest transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <h1 className="text-4xl font-black tracking-tight text-white uppercase tracking-tighter">User Profile</h1>
        <p className="text-sm text-white/40 uppercase tracking-[0.2em] font-bold pl-0.5">Account configuration</p>
      </header>

      {/* Profile Card */}
      <div className="p-10 rounded-[3rem] glass-dark border border-white/5 space-y-10 max-w-2xl">
        {/* Avatar + Name */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-3xl font-black text-white">
            {user.name[0]}
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">{user.name}</h2>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                user.role === 'admin' 
                  ? 'text-purple-400 border-purple-500/20 bg-purple-500/5'
                  : 'text-blue-400 border-blue-500/20 bg-blue-500/5'
              }`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Mail, label: 'Email', value: user.email },
            { icon: Shield, label: 'Role', value: user.role === 'admin' ? 'Administrator' : 'Standard User' },
            { icon: User, label: 'User ID', value: user.id },
            { icon: Calendar, label: 'Member Since', value: new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2 hover:border-white/10 transition-all">
              <div className="flex items-center gap-2 text-white/20">
                <item.icon size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
              </div>
              <p className="text-xs font-bold text-white truncate">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-black text-xs uppercase tracking-widest hover:bg-red-500/20 hover:text-red-300 transition-all flex items-center justify-center gap-3"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
