'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOut, Loader2 } from 'lucide-react';

interface RouteGuardProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

export default function RouteGuard({ children, allowedRoles }: RouteGuardProps) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            const userStr = localStorage.getItem("user");
            const role = localStorage.getItem("role");

            if (!token || !userStr || !role) {
                router.replace("/product/leadflow/auth");
                return;
            }

            const user = JSON.parse(userStr);

            // If account is not approved, block
            if (user.status !== 'approved' && user.role !== 'admin') {
                router.replace("/product/leadflow/auth");
                return;
            }

            // Role check
            if (allowedRoles && !allowedRoles.includes(role)) {
                // Redirect to correct dashboard based on actual role
                if (role === 'admin') router.replace("/admin-dashboard");
                else if (role === 'coaching') router.replace("/product/leadflow/dashboard/business");
                else if (role === 'broker') router.replace("/product/leadflow/dashboard/professional");
                else router.replace("/product/leadflow");
                return;
            }

            setIsAuthorized(true);
            setIsLoading(false);
        };

        checkAuth();
    }, [router, allowedRoles]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-slate-50 flex items-center justify-center z-[9999]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Verifying Security Clearence...</p>
                </div>
            </div>
        );
    }

    return isAuthorized ? <>{children}</> : null;
}
