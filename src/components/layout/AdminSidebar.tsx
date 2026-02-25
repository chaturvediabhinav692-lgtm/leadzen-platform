'use client';

import { LayoutDashboard, Users, CreditCard, LifeBuoy, UserCheck } from 'lucide-react';
import SidebarShell from './SidebarShell';

const navItems = [
    { name: 'Dashboard', href: '/admin-dashboard', icon: LayoutDashboard },
    { name: 'Account Approvals', href: '/admin/approvals', icon: UserCheck },
    { name: 'Tickets', href: '/admin/tickets', icon: LifeBuoy },
    { name: 'Clients', href: '/admin/clients', icon: Users },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
];

export default function AdminSidebar() {
    return <SidebarShell navItems={navItems} roleLabel="Admin User" roleEmail="admin@coaching.com" roleBadge="AD" />;
}
