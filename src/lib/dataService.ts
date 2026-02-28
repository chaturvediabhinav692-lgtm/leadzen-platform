import { leadService } from '@/services/leadService';
import { ticketService } from '@/services/ticketService';
import { Client } from './mockData';
import { Ticket } from './adminData';

export const dataService = {
    // LEADS
    async getLeads(): Promise<Client[]> {
        return leadService.getLeads();
    },

    async getUnassignedLeads(): Promise<Client[]> {
        return leadService.getUnassignedLeads();
    },

    async assignLead(id: string, brokerId: string) {
        return leadService.assignLead(id, brokerId);
    },

    async updateLead(id: string, updates: Partial<Client>) {
        return leadService.updateLead(id, updates);
    },

    // TICKETS
    async getTickets(): Promise<Ticket[]> {
        return ticketService.getTickets();
    },

    async createTicket(ticketData: any) {
        return ticketService.createTicket(ticketData);
    },

    async resolveTicket(id: string) {
        return ticketService.resolveTicket(id);
    },

    // REAL-TIME SUBSCRIPTIONS (PLACEHOLDERS)
    subscribeToLeads(callback: (payload: any) => void) {
        console.warn('Real-time leads subscription currently unavailable.');
        return { unsubscribe: () => { } };
    },

    subscribeToTickets(callback: (payload: any) => void) {
        console.warn('Real-time tickets subscription currently unavailable.');
        return { unsubscribe: () => { } };
    }
};
