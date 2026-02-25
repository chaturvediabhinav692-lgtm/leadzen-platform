'use client';

import { Users, Briefcase, LayoutDashboard, LifeBuoy, Flag, HelpCircle } from 'lucide-react';
import SidebarShell from './SidebarShell';

const navItems = [
    { name: 'Professional Command Center', href: '/professional-command-center', icon: LayoutDashboard },
    { name: 'Sales Cockpit', href: '/professional-dashboard', icon: Briefcase },
    { name: 'My Clients', href: '/clients', icon: Users },
    { name: 'Ticket Center', href: '/my-tickets', icon: LifeBuoy },
    { name: 'Report Issue', href: '/help', icon: Flag },
    { name: 'Contact Support', href: '/support', icon: HelpCircle },
];

export default function BrokerSidebar() {
    return <SidebarShell navItems={navItems} />;
}
