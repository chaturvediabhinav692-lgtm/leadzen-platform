
import { Ticket, INITIAL_TICKETS } from './adminData';

const STORAGE_KEY = 'leadflow_tickets';

export const getStoredTickets = (): Ticket[] => {
    if (typeof window === 'undefined') return INITIAL_TICKETS;
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_TICKETS;
};

export const saveStoredTicket = (ticket: Omit<Ticket, 'id' | 'status' | 'createdDate'>) => {
    const tickets = getStoredTickets();
    const newTicket: Ticket = {
        ...ticket,
        id: `t_${Date.now()}`,
        status: 'Open',
        createdDate: new Date().toISOString()
    };
    const updated = [newTicket, ...tickets];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newTicket;
};

export const resolveStoredTicket = (id: string) => {
    const tickets = getStoredTickets();
    const updated = tickets.map(t =>
        t.id === id ? { ...t, status: 'Resolved' as const } : t
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
};
