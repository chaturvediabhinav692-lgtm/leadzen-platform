'use client';

import { LayoutDashboard, Users, CreditCard, LifeBuoy } from 'lucide-react';
import SidebarShell from './SidebarShell';

const navItems = [
    { name: 'Dashboard', href: '/admin-dashboard', icon: LayoutDashboard },
    { name: 'Tickets', href: '/admin/tickets', icon: LifeBuoy },
    { name: 'Clients', href: '/admin/clients', icon: Users },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
];

export default function AdminSidebar() {
    return <SidebarShell navItems={navItems} roleLabel="Admin User" roleEmail="admin@coaching.com" roleBadge="AD" />;
}
