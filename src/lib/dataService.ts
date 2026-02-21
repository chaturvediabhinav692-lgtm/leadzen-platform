import { supabase, isSupabaseConfigured } from './supabaseClient';
import { Client, INITIAL_CLIENTS, INITIAL_BROKERS } from './mockData';
import { Ticket, INITIAL_TICKETS } from './adminData';
import { getCurrentUser } from './authMock';

export const dataService = {
    // LEADS
    async getLeads(): Promise<Client[]> {
        if (!isSupabaseConfigured) {
            console.warn('Supabase not configured. Using mock leads.');
            const user = getCurrentUser();
            if (user.role === 'broker') {
                return INITIAL_CLIENTS.filter(c => c.assignedBrokerId === user.id);
            }
            return INITIAL_CLIENTS;
        }

        const user = getCurrentUser();
        let query = supabase.from('leads').select('*').order('lastActivityAt', { ascending: false });

        // Role-based filtering
        if (user.role === 'broker') {
            query = query.eq('assignedBrokerId', user.id);
        }

        const { data, error } = await query;
        if (error) {
            console.error('Error fetching leads:', error.message || error);
            return INITIAL_CLIENTS; // Fallback on error
        }
        return data as Client[];
    },

    async getUnassignedLeads(): Promise<Client[]> {
        if (!isSupabaseConfigured) {
            return INITIAL_CLIENTS.filter(c => !c.assignedBrokerId || c.assignedBrokerId === 'unassigned');
        }

        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .or('assignedBrokerId.is.null,assignedBrokerId.eq.unassigned')
            .order('lastActivityAt', { ascending: false });

        if (error) {
            console.error('Error fetching unassigned leads:', error.message || error);
            return [];
        }
        return data as Client[];
    },

    async assignLead(id: string, brokerId: string) {
        if (!isSupabaseConfigured) {
            console.warn('Mock Mode: Cannot persist lead assignment.');
            return null;
        }

        const { data, error } = await supabase
            .from('leads')
            .update({
                assignedBrokerId: brokerId,
                lastActivityAt: Date.now()
            })
            .eq('id', id)
            .select();

        if (error) console.error('Error assigning lead:', error.message || error);
        return data;
    },

    async updateLead(id: string, updates: Partial<Client>) {
        if (!isSupabaseConfigured) {
            console.warn('Mock Mode: Cannot persist lead update.');
            return null;
        }

        const { data, error } = await supabase
            .from('leads')
            .update({
                ...updates,
                lastActivityAt: Date.now()
            })
            .eq('id', id)
            .select();

        if (error) console.error('Error updating lead:', error.message || error);
        return data;
    },

    // TICKETS
    async getTickets(): Promise<Ticket[]> {
        if (!isSupabaseConfigured) {
            console.warn('Supabase not configured. Using mock tickets.');
            const user = getCurrentUser();
            if (user.role !== 'admin') {
                return INITIAL_TICKETS.filter(t => t.userId === user.id);
            }
            return INITIAL_TICKETS;
        }

        const user = getCurrentUser();
        let query = supabase.from('tickets').select('*').order('createdAt', { ascending: false });

        if (user.role !== 'admin') {
            query = query.eq('userId', user.id);
        }

        const { data, error } = await query;
        if (error) {
            console.error('Error fetching tickets:', error.message || error);
            return INITIAL_TICKETS;
        }
        return data as Ticket[];
    },

    async createTicket(ticketData: any) {
        if (!isSupabaseConfigured) {
            console.warn('Mock Mode: Cannot persist ticket creation.');
            return null;
        }

        const user = getCurrentUser();
        const { data, error } = await supabase
            .from('tickets')
            .insert([{
                ...ticketData,
                userId: user.id,
                role: user.role,
                status: 'open',
                createdAt: new Date().toISOString()
            }])
            .select();

        if (error) console.error('Error creating ticket:', error.message || error);
        return data;
    },

    async resolveTicket(id: string) {
        if (!isSupabaseConfigured) {
            console.warn('Mock Mode: Cannot persist ticket resolution.');
            return null;
        }

        const { data, error } = await supabase
            .from('tickets')
            .update({ status: 'resolved' })
            .eq('id', id)
            .select();

        if (error) console.error('Error resolving ticket:', error.message || error);
        return data;
    },

    // REAL-TIME SUBSCRIPTION HELPER
    subscribeToLeads(callback: (payload: any) => void) {
        if (!isSupabaseConfigured) return { unsubscribe: () => { } };

        return supabase
            .channel('leads-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, callback)
            .subscribe();
    },

    subscribeToTickets(callback: (payload: any) => void) {
        if (!isSupabaseConfigured) return { unsubscribe: () => { } };

        return supabase
            .channel('tickets-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, callback)
            .subscribe();
    }
};
