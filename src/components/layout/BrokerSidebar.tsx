'use client';

import { Users, Briefcase, LayoutDashboard, LifeBuoy, Flag, HelpCircle } from 'lucide-react';
import SidebarShell from './SidebarShell';

const navItems = [
    { name: 'Command Center', href: '/broker-command-center', icon: LayoutDashboard },
    { name: 'Sales Cockpit', href: '/broker-dashboard', icon: Briefcase },
    { name: 'My Clients', href: '/clients', icon: Users },
    { name: 'Ticket Center', href: '/my-tickets', icon: LifeBuoy },
    { name: 'Report Issue', href: '/help', icon: Flag },
    { name: 'Contact Support', href: '/support', icon: HelpCircle },
];

export default function BrokerSidebar() {
    return <SidebarShell navItems={navItems} roleLabel="Sales Broker" roleEmail="broker@coaching.com" roleBadge="BR" />;
}
