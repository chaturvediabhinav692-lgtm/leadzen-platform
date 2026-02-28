import { apiRequest } from '@/lib/api';
import { Ticket } from '@/lib/adminData';

export const ticketService = {
    async getTickets(): Promise<Ticket[]> {
        return apiRequest<Ticket[]>('/tickets');
    },

    async createTicket(ticketData: any): Promise<Ticket> {
        return apiRequest<Ticket>('/tickets', {
            method: 'POST',
            body: JSON.stringify(ticketData)
        });
    },

    async resolveTicket(id: string): Promise<Ticket> {
        return apiRequest<Ticket>(`/tickets/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: 'resolved' })
        });
    }
};
