import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { ShieldCheck, LayoutDashboard, Menu, X } from 'lucide-react';

export default function PlatformNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/products/leadzen', label: 'LeadZen' },
  ];

  const AuthButtons = () => {
    if (isLoading) {
      return (
        <div className="flex items-center gap-4">
          <div className="w-20 h-8 rounded-full bg-white/5 animate-shimmer" />
          <div className="w-28 h-8 rounded-full bg-white/5 animate-shimmer" />
        </div>
      );
    }

    if (!user) {
      return (
        <>
          <Link to="/login" className="text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white/60 hover:text-white" onClick={() => setIsMobileOpen(false)}>Login</Link>
          <Link to="/signup" className="text-[10px] font-black uppercase tracking-widest px-8 py-2.5 rounded-full bg-white text-black hover:scale-105 transition-all shadow-lg shadow-white/10" onClick={() => setIsMobileOpen(false)}>Get Started</Link>
        </>
      );
    }

    if (user.role === 'admin') {
      return (
        <Link 
          to="/admin/dashboard" 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-8 py-2.5 rounded-full bg-purple-700 text-white border border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:bg-purple-600 hover:scale-105 transition-all"
          onClick={() => setIsMobileOpen(false)}
        >
          <ShieldCheck size={14} />
          Go to Terminal
        </Link>
      );
    }

    return (
      <Link 
        to="/dashboard" 
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-8 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 transition-all shadow-lg shadow-blue-500/20"
        onClick={() => setIsMobileOpen(false)}
      >
        <LayoutDashboard size={14} />
        Dashboard
      </Link>
    );
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 glass-dark shadow-xl' : 'py-6 bg-transparent'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-black border-2 border-white/20 group-hover:scale-110 transition-transform">E</div>
            <span className="text-xl font-bold tracking-tight text-white uppercase group-hover:tracking-[0.1em] transition-all">Euonex</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 min-w-[200px] justify-end">
              <AuthButtons />
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" onClick={() => setIsMobileOpen(false)} />
          <div className="relative z-50 pt-24 px-6 pb-12 space-y-8 animate-fade-in">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-6 py-4 rounded-2xl text-lg font-black uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-white/5 flex flex-col gap-4">
              <AuthButtons />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
