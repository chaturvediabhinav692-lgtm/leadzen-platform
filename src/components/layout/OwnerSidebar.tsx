'use client';

import { LayoutDashboard, Users, Briefcase, LifeBuoy, Flag, HelpCircle } from 'lucide-react';
import SidebarShell from './SidebarShell';

const navItems = [
    { name: 'Command Center', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Lead Intake Panel', href: '/intake-panel', icon: Briefcase },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Ticket Center', href: '/my-tickets', icon: LifeBuoy },
    { name: 'Report Issue', href: '/help', icon: Flag },
    { name: 'Contact Support', href: '/support', icon: HelpCircle },
];

export default function OwnerSidebar() {
    return <SidebarShell navItems={navItems} roleLabel="Business Owner" roleEmail="owner@euonex.io" roleBadge="OW" />;
}
