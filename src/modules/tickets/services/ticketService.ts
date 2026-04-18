import { apiFetch, apiWithRetry } from '@/api/client';
import { Ticket, TicketResponse } from '../types';

export const ticketService = {
  async getTickets(): Promise<TicketResponse<Ticket[]>> {
    return apiWithRetry(() => apiFetch<TicketResponse<Ticket[]>>('/tickets'));
  },

  async createTicket(data: Pick<Ticket, 'subject' | 'description' | 'priority' | 'issueType'>): Promise<TicketResponse<Ticket>> {
    return apiFetch<TicketResponse<Ticket>>('/tickets', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateTicket(id: string, data: Partial<Ticket>): Promise<TicketResponse<Ticket>> {
    return apiFetch<TicketResponse<Ticket>>(`/tickets/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async uploadData(formData: FormData): Promise<TicketResponse<any>> {
    // Note: Fetch auto-sets multipart/form-data boundary with FormData
    return apiFetch<TicketResponse<any>>('/data-upload', {
      method: 'POST',
      body: formData,
      headers: {
        // Omitting Content-Type so browser sets it with boundary
      } as any
    });
  },
};
