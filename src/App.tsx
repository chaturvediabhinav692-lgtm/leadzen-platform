import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/modules/auth/context/AuthContext';
import AdminRouteGuard from '@/components/AdminRouteGuard';
import { RefreshCw } from 'lucide-react';
import { Toaster } from 'sonner';

// Critical Layouts
import PlatformLayout from '@/layouts/PlatformLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Error Pages
import AccessDenied from '@/pages/errors/AccessDenied';
import NotFound from '@/pages/errors/NotFound';

// Lazy-loaded Pages
const Home = lazy(() => import('@/pages/Home'));
const Products = lazy(() => import('@/pages/Products'));
const LeadZenProduct = lazy(() => import('@/pages/LeadZenProduct'));
const Login = lazy(() => import('@/pages/Login'));
const Signup = lazy(() => import('@/pages/Signup'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Leads = lazy(() => import('@/pages/Leads'));
const Support = lazy(() => import('@/pages/Support'));
const CreateTicket = lazy(() => import('@/pages/CreateTicket'));
const DataUpload = lazy(() => import('@/pages/DataUpload'));
const Profile = lazy(() => import('@/pages/Profile'));

// Admin Pages
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminTickets = lazy(() => import('@/pages/admin/AdminTickets'));
const AdminUsers = lazy(() => import('@/pages/admin/AdminUsers'));

// Global Loading Shimmer
const LoadingShimmer = () => (
  <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center space-y-6">
    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group">
       <div className="absolute inset-0 bg-white/10 animate-shimmer" />
       <RefreshCw size={32} className="animate-spin text-white opacity-20" />
    </div>
    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] animate-pulse">Syncing Environment</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingShimmer />}>
          <Routes>
            {/* Global Error Routes */}
            <Route path="/403" element={<AccessDenied />} />

            {/* Platform Routes */}
            <Route element={<PlatformLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/leadzen" element={<LeadZenProduct />} />
            </Route>

            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* User Dashboard Routes (Protected by DashboardLayout logic) */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/data-upload" element={<DataUpload />} />
              <Route path="/support" element={<Support />} />
              <Route path="/support/create-ticket" element={<CreateTicket />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Admin Terminal Routes (Strictly Isolated & Guarded) */}
            <Route
              path="/admin"
              element={
                <AdminRouteGuard>
                  <AdminLayout />
                </AdminRouteGuard>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="tickets" element={<AdminTickets />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster 
          position="bottom-right" 
          theme="dark"
          toastOptions={{
            style: {
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.05)',
              color: '#fff',
              backdropFilter: 'blur(20px)',
              borderRadius: '1rem',
              fontSize: '10px',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}
