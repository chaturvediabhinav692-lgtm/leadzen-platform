export interface Ticket {
  id: string;
  subject: string;
  description: string;
  issueType: 'technical' | 'billing' | 'feature' | 'other' | string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed' | string;
  priority: 'low' | 'medium' | 'high' | string;
  userId: string;
  userName?: string;
  userEmail?: string;
  image?: string;
  createdAt?: string;
  createdDate?: string;
  updatedAt: string;
}

export interface TicketResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
