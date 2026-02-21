'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';

// Route Rules
const RULES: Record<string, string[]> = {
    '/dashboard': ['admin', 'owner'],
    '/student-dashboard': ['admin', 'owner'],
    '/broker-dashboard': ['admin', 'broker'],
    '/broker-command-center': ['admin', 'broker'],
    '/clients': ['admin', 'owner', 'broker'],
    '/admin-dashboard': ['admin'],
    '/admin/tickets': ['admin'],
    '/admin/clients': ['admin'],
    '/admin/payments': ['admin'],
    '/support': ['owner', 'broker'], // Admin uses Admin Dashboard
    '/help': ['owner', 'broker'],    // Admin doesn't submit tickets
    '/my-tickets': ['owner', 'broker'],
    '/coaching-dashboard': ['admin'],
    // Admin Sidebar has it, Owner doesn't strictly have it in your spec.
    // Admin Sidebar: Sales Cockpit, Lead Intake, Command Center, Clients, Pipeline Overview.
};

export default function RouteGuard({ children }: { children: React.ReactNode }) {
    const { role } = useStore();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Find matching rule
        const allowedRoles = RULES[pathname];

        if (allowedRoles && !allowedRoles.includes(role)) {
            // Redirect based on role
            if (role === 'broker') router.push('/broker-dashboard');
            else if (role === 'owner') router.push('/dashboard');
            else router.push('/dashboard'); // Admin fallback
        }
    }, [pathname, role, router]);

    return <>{children}</>;
}
