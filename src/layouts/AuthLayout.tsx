import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-white/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[100px] -z-10" />
      
      <div className="w-full max-w-md animate-fade-in">
        <Outlet />
      </div>
    </div>
  );
}
