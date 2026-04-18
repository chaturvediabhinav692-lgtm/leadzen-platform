import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  LifeBuoy, 
  Upload, 
  LogOut,
  User,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Leads', href: '/leads', icon: Users },
  { label: 'Data Upload', href: '/data-upload', icon: Upload },
  { label: 'Support', href: '/support', icon: LifeBuoy },
  { label: 'Profile', href: '/profile', icon: User },
];

interface SidebarContentProps {
  pathname: string;
  user: any;
  logout: () => void;
  onClose?: () => void;
}

const SidebarContent = ({ pathname, user, logout, onClose }: SidebarContentProps) => (
  <div className="flex flex-col h-full uppercase-text-cleanup">
    <div className="flex items-center justify-between px-2 text-white shrink-0 mb-12">
      <Link to="/dashboard" className="flex items-center gap-3" onClick={onClose}>
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-black text-black shadow-lg shadow-white/5">E</div>
        <span className="font-bold tracking-widest uppercase text-sm">LeadZen</span>
      </Link>
      {onClose && (
        <button 
          onClick={onClose}
          className="lg:hidden w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white"
        >
          <X size={16} />
        </button>
      )}
    </div>

    <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
      <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] px-4 mb-4">Navigation</p>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={onClose}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-xs group ${
              isActive 
                ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon size={18} className={isActive ? 'text-black' : 'text-white/10 group-hover:text-white/60 transition-colors'} />
            {item.label}
          </Link>
        );
      })}

      {user?.role === 'admin' && (
        <div className="pt-4 mt-4 border-t border-white/5">
            <Link
              to="/admin/dashboard"
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-xs group text-red-400 hover:bg-red-400/10 border border-red-500/10"
            >
              <div className="w-5 h-5 rounded bg-red-500 flex items-center justify-center text-white">
                <Menu size={10} strokeWidth={4} />
              </div>
              Admin Terminal
            </Link>
        </div>
      )}
    </nav>

    <div className="pt-6 border-t border-white/5 space-y-4 shrink-0 mt-auto">
      <div className="px-2">
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-4">Account</p>
        <Link 
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-all"
        >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'User'}</p>
              <p className="text-[9px] text-white/30 truncate uppercase tracking-[0.1em]">{user?.role || 'Member'}</p>
            </div>
        </Link>
      </div>
      
      <button 
        onClick={() => { logout(); onClose?.(); }}
        className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all font-bold text-xs group"
      >
        <LogOut size={18} className="text-white/10 group-hover:text-red-400/60" />
        Sign Out
      </button>
    </div>
  </div>
);

export default function DashboardSidebar() {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 glass-dark border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center font-black text-black text-xs">E</div>
          <span className="font-bold tracking-widest uppercase text-xs text-white">LeadZen</span>
        </Link>
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 glass-dark border-r border-white/5 flex-col p-6 z-50">
        <SidebarContent pathname={pathname} user={user} logout={logout} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <aside className="relative w-72 h-full glass-dark border-r border-white/5 flex flex-col p-6 animate-fade-in shadow-2xl">
            <SidebarContent 
              pathname={pathname} 
              user={user} 
              logout={logout} 
              onClose={() => setIsMobileOpen(false)} 
            />
          </aside>
        </div>
      )}
    </>
  );
}
