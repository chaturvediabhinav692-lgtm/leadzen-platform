import { Lead, LeadStatus, LeadAnalytics } from '@/modules/leads/types';
import { Ticket } from '@/modules/tickets/types';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export type UserRole = 'admin' | 'user' | 'agent' | 'manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  lastLogin?: string;
}

export type { Lead, Ticket, LeadStatus, LeadAnalytics };
