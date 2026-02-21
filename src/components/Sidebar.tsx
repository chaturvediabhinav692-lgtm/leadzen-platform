'use client';

import { useStore } from '@/lib/store';
import AdminSidebar from './layout/AdminSidebar';
import OwnerSidebar from './layout/OwnerSidebar';
import BrokerSidebar from './layout/BrokerSidebar';

export default function Sidebar() {
    const { role } = useStore();

    switch (role) {
        case 'owner':
            return <OwnerSidebar />;
        case 'broker':
            return <BrokerSidebar />;
        case 'admin':
        default:
            return <AdminSidebar />;
    }
}
