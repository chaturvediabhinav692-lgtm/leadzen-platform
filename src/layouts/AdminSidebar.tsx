import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { 
  BarChart3, 
  Users2, 
  Ticket, 
  LogOut, 
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  User,
} from 'lucide-react';
import { useState } from 'react';

const ADMIN_NAV_ITEMS = [
  { label: 'Admin Dashboard', href: '/admin/dashboard', icon: BarChart3 },
  { label: 'Manage Tickets', href: '/admin/tickets', icon: Ticket },
  { label: 'System Users', href: '/admin/users', icon: Users2 },
  { label: 'Profile', href: '/admin/profile', icon: User },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between px-2 text-red-500">
        <Link to="/admin/dashboard" className="flex items-center gap-3" onClick={() => setIsMobileOpen(false)}>
          <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center font-black text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <ShieldCheck size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-[0.2em] uppercase text-[10px] leading-none mb-1">LeadZen</span>
            <span className="font-bold text-[8px] text-white/40 tracking-[0.3em] uppercase">Admin Terminal</span>
          </div>
        </Link>
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] px-4 mb-4">Core Controls</p>
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all font-bold text-xs group ${
                isActive 
                  ? 'bg-red-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.2)]' 
                  : 'text-white/30 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon size={16} className={isActive ? 'text-white' : 'text-white/10 group-hover:text-red-400 transition-colors'} />
                {item.label}
              </div>
              {isActive && <ChevronRight size={14} className="opacity-40" />}
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-white/5">
           <Link
              to="/dashboard"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-[10px] uppercase tracking-widest text-emerald-400 hover:bg-emerald-400/10 border border-emerald-500/10 group"
            >
              <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center text-black">
                <BarChart3 size={10} strokeWidth={4} />
              </div>
              Switch to Dashboard
            </Link>
        </div>
      </nav>

      <div className="pt-6 border-t border-white/5 space-y-3">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-white/20 hover:text-red-500 hover:bg-red-500/5 transition-all font-bold text-[10px] uppercase tracking-widest group"
        >
          <LogOut size={16} className="text-white/10 group-hover:text-red-500/60" />
          Sign Out
        </button>
        
        <Link 
          to="/admin/profile"
          onClick={() => setIsMobileOpen(false)}
          className="block px-5 py-6 bg-white/[0.02] rounded-[2rem] border border-white/5 hover:border-white/10 transition-all"
        >
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[10px] font-black text-red-400">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-white truncate uppercase">{user?.name || 'Admin'}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[8px] text-emerald-500/50 font-black uppercase tracking-widest">Active Session</p>
                </div>
              </div>
           </div>
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a] border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-red-500 flex items-center justify-center font-black text-white text-xs">
            <ShieldCheck size={14} />
          </div>
          <span className="font-bold tracking-widest uppercase text-[10px] text-red-400">Admin Terminal</span>
        </Link>
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-[#0a0a0a] border-r border-white/5 flex-col p-6 space-y-12 z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <aside className="relative w-72 h-full bg-[#0a0a0a] border-r border-white/5 flex flex-col p-6 space-y-12 animate-fade-in">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
