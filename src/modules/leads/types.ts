export type LeadStatus =
  | 'new'
  | 'hot'
  | 'warm'
  | 'cold'
  | 'assigned'
  | 'converted'
  | 'snoozed'
  | 'rejected';

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone: string;
  courseInterest: string;
  status: LeadStatus;
  company?: string;
  telegramUsername?: string;
  assignedBrokerId: string | null;
  lastActivityAt: number;
  updatedAt?: string;
}

export interface LeadResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface LeadAnalytics {
  totalLeads: number;
  leadsThisMonth: number;
  convertedThisMonth: number;
  totalRevenue: number;
  monthlyLeads: { month: string; leads: number }[];
  monthlyConversion: { month: string; rate: number }[];
  conversionStats: { name: string; value: number }[];
}
