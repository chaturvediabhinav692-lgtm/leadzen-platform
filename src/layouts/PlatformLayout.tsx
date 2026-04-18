import { Outlet } from 'react-router-dom';
import PlatformNavbar from '@/layouts/PlatformNavbar';
import Footer from '@/components/Footer';

export default function PlatformLayout() {
  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col">
      <PlatformNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
