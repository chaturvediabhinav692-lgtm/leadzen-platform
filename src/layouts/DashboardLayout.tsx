import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/layouts/DashboardSidebar';
import { useAuth } from '@/modules/auth/context/AuthContext';

export default function DashboardLayout() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Protected route logic
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/login', { replace: true });
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      }
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">
        <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <DashboardSidebar />
      {/* lg: left margin for sidebar, mobile: top padding for top bar */}
      <main className="lg:ml-64 min-h-screen p-6 pt-20 lg:p-10 lg:pt-10 pb-20 overflow-x-hidden relative">
        {/* Background Accent */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[160px] -z-10 pointer-events-none" />
        <Outlet />
      </main>
    </div>
  );
}
