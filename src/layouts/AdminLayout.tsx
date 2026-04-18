import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '@/layouts/AdminSidebar';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { RefreshCw } from 'lucide-react';

export default function AdminLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">
        <RefreshCw size={52} className="animate-spin text-red-500 opacity-20" />
      </div>
    );
  }

  // Final protection layer inside layout
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white selection:bg-red-500/30">
      <AdminSidebar />
      {/* lg: left margin for sidebar, mobile: top padding for top bar */}
      <main className="lg:ml-64 min-h-screen p-6 pt-20 lg:p-12 lg:pt-12 pb-20 overflow-x-hidden relative">
        {/* Background Accent (Admin-specific branding) */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[180px] -z-10 pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-red-900/5 rounded-full blur-[140px] -z-10 pointer-events-none translate-x-[-20%] translate-y-[20%]" />
        
        <Outlet />
      </main>
    </div>
  );
}
