import { apiRequest } from '@/lib/api';
import { Client } from '@/lib/mockData';

export const leadService = {
    async getLeads(): Promise<Client[]> {
        return apiRequest<Client[]>('/leads');
    },

    async getUnassignedLeads(): Promise<Client[]> {
        return apiRequest<Client[]>('/leads?unassigned=true');
    },

    async assignLead(id: string, brokerId: string): Promise<Client> {
        return apiRequest<Client>(`/leads/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ assignedBrokerId: brokerId })
        });
    },

    async updateLead(id: string, updates: Partial<Client>): Promise<Client> {
        return apiRequest<Client>(`/leads/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updates)
        });
    }
};
