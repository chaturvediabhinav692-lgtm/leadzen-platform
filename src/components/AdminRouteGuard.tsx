import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { RefreshCw } from 'lucide-react';

interface AdminRouteGuardProps {
  children: ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center space-y-6">
        <RefreshCw size={48} className="animate-spin text-white opacity-20" />
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Verifying Security Clearance</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
