import { apiFetch, apiWithRetry } from '@/api/client';
import { Lead, LeadResponse, LeadAnalytics } from '../types';
import { normalizeLead } from '@/lib/leadUtils';

export const leadService = {
  async getLeads(): Promise<LeadResponse<Lead[]>> {
    return apiWithRetry(() => apiFetch<LeadResponse<Lead[]>>('/leads')).then(res => {
      if (res.success && Array.isArray(res.data)) {
        return { ...res, data: res.data.map(normalizeLead) };
      }
      return res;
    });
  },

  async createLead(data: Partial<Lead>): Promise<LeadResponse<Lead>> {
    return apiFetch<LeadResponse<Lead>>('/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(res => {
      if (res.success && res.data) {
        return { ...res, data: normalizeLead(res.data) };
      }
      return res;
    });
  },

  async updateLead(id: string, data: Partial<Lead>): Promise<LeadResponse<Lead>> {
    return apiFetch<LeadResponse<Lead>>(`/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }).then(res => {
      if (res.success && res.data) {
        return { ...res, data: normalizeLead(res.data) };
      }
      return res;
    });
  },

  async deleteLead(id: string): Promise<LeadResponse<null>> {
    return apiFetch<LeadResponse<null>>(`/leads/${id}`, { method: 'DELETE' });
  },

  async getAnalytics(): Promise<LeadResponse<LeadAnalytics>> {
    return apiFetch<LeadResponse<LeadAnalytics>>('/analytics/leads');
  },
};
