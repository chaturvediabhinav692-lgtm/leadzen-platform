
export interface PlatformClient {
    id: string;
    name: string;
    plan: 'Pro' | 'Enterprise' | 'Starter';
    status: 'Active' | 'Churned' | 'Trial';
    revenue: number; // Monthly revenue
    joinedDate: string;
}

export interface Ticket {
    id: string;
    userId: string; // ID of user who created it
    userName: string; // Name of user
    issueType: 'Technical' | 'Billing' | 'Feature Request' | 'Other';
    priority: 'High' | 'Medium' | 'Low';
    description: string;
    image?: string; // Base64 or URL
    status: 'Open' | 'Resolved';
    createdDate: string;
}

export const PLATFORM_CLIENTS: PlatformClient[] = [
    { id: 'cl1', name: 'Apex Coaching', plan: 'Enterprise', status: 'Active', revenue: 25000, joinedDate: '2023-01-15' },
    { id: 'cl2', name: 'Bright Future Academy', plan: 'Pro', status: 'Active', revenue: 8000, joinedDate: '2023-03-10' },
    { id: 'cl3', name: 'Scholar Point', plan: 'Starter', status: 'Trial', revenue: 0, joinedDate: '2023-11-20' },
    { id: 'cl4', name: 'Elite Tutors', plan: 'Pro', status: 'Churned', revenue: 0, joinedDate: '2023-06-05' },
    { id: 'cl5', name: 'Focus Classes', plan: 'Pro', status: 'Active', revenue: 8000, joinedDate: '2023-08-12' },
];

export const INITIAL_TICKETS: Ticket[] = [
    {
        id: 't1', userId: 'u1', userName: 'Rajesh Kumar (Professional)',
        issueType: 'Technical', priority: 'High', description: 'Dashboard not loading on mobile info.',
        status: 'Open', createdDate: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
        id: 't2', userId: 'u2', userName: 'Apex Business (Owner)',
        issueType: 'Billing', priority: 'Medium', description: 'Need invoice for Oct.',
        status: 'Resolved', createdDate: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
        id: 't3', userId: 'u1', userName: 'Rajesh Kumar (Professional)',
        issueType: 'Feature Request', priority: 'Low', description: 'Add dark mode please.',
        status: 'Open', createdDate: new Date(Date.now() - 3600000).toISOString()
    },
];

export const REVENUE_DATA = [
    { name: 'Jan', value: 35000 },
    { name: 'Feb', value: 38000 },
    { name: 'Mar', value: 42000 },
    { name: 'Apr', value: 41000 },
    { name: 'May', value: 45000 },
    { name: 'Jun', value: 48000 },
];

export interface Payment {
    id: string;
    clientName: string;
    clientId: string; // Link to PlatformClient
    plan: 'Pro' | 'Enterprise' | 'Starter';
    amount: number;
    status: 'Paid' | 'Pending' | 'Failed';
    date: string;
}

export const PAYMENTS: Payment[] = [
    { id: 'p1', clientName: 'Apex Coaching', clientId: 'cl1', plan: 'Enterprise', amount: 25000, status: 'Paid', date: '2023-10-01' },
    { id: 'p2', clientName: 'Bright Future Academy', clientId: 'cl2', plan: 'Pro', amount: 8000, status: 'Paid', date: '2023-10-03' },
    { id: 'p3', clientName: 'Focus Classes', clientId: 'cl5', plan: 'Pro', amount: 8000, status: 'Pending', date: '2023-10-05' },
    { id: 'p4', clientName: 'Apex Coaching', clientId: 'cl1', plan: 'Enterprise', amount: 25000, status: 'Paid', date: '2023-09-01' },
    { id: 'p5', clientName: 'Bright Future Academy', clientId: 'cl2', plan: 'Pro', amount: 8000, status: 'Paid', date: '2023-09-03' },
];
