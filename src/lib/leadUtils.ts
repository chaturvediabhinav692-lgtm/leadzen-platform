import { Lead } from '@/modules/leads/types';

/**
 * Normalizes lead data for consistent rendering across components
 */
export const normalizeLead = (lead: any): Lead => {
  return {
    ...lead,
    name: lead.name || 'Unknown Prospect',
    status: (lead.status as any) || 'new',
    courseInterest: lead.courseInterest || 'General Interest',
    updatedAt: lead.updatedAt || new Date().toISOString(),
  };
};
