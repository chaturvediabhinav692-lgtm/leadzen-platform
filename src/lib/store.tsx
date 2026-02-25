'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Client, Broker, Activity, ClientStatus, INITIAL_CLIENTS, INITIAL_BROKERS } from './mockData';
import { Ticket, PlatformClient, INITIAL_TICKETS, PLATFORM_CLIENTS, Payment, PAYMENTS } from './adminData';

interface StoreContextType {
    role: 'admin' | 'owner' | 'broker';
    setRole: (role: 'admin' | 'owner' | 'broker') => void;
    clients: Client[];
    brokers: Broker[];
    tickets: Ticket[];
    platformClients: PlatformClient[];
    payments: Payment[];
    activityLog: { type: string, text: string, time: string, user: string }[];
    users: {
        id: string,
        name: string,
        email: string,
        phone: string,
        profession: string,
        businessName: string,
        city?: string,
        role: 'admin' | 'owner' | 'broker',
        status: string,
        plan?: "starter" | "growth",
        subscriptionStart?: string,
        subscriptionEnd?: string
    }[];
    currentUser: any | null;
    registerUser: (userData: any) => void;
    approveUser: (userId: string) => void;
    rejectUser: (userId: string) => void;
    setCurrentUser: (user: any | null) => void;
    updateClientStatus: (clientId: string, status: ClientStatus) => void;
    assignBroker: (clientId: string, brokerId: string | null) => void;
    addNote: (clientId: string, note: string) => void;
    addActivity: (clientId: string, activity: Omit<Activity, 'id' | 'timestamp'>) => void;
    getClientById: (id: string) => Client | undefined;
    addMessage: (clientId: string, text: string, sender: 'client' | 'bot' | 'broker') => void;
    getBrokerById: (id: string) => Broker | undefined;
    addTicket: (ticket: Omit<Ticket, 'id' | 'createdDate' | 'status'>) => void;
    resolveTicket: (id: string) => void;
    callLead: (clientId: string) => void;
    whatsappLead: (clientId: string, message?: string) => void;
    snoozeLead: (clientId: string, hours?: number) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
    const [brokers] = useState<Broker[]>(INITIAL_BROKERS);
    // Ticket & Admin State
    const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
    const [platformClients] = useState<PlatformClient[]>(PLATFORM_CLIENTS);
    const [payments] = useState<Payment[]>(PAYMENTS);

    // Hydrate from localStorage if desired, but for now we stick to memory/mock
    // In a real app we'd load here

    const [role, setRole] = useState<'admin' | 'owner' | 'broker'>('admin');
    const [users, setUsers] = useState<any[]>([
        {
            id: 'admin-0',
            name: 'System Admin',
            email: 'admin@euonex.io',
            role: 'admin',
            status: 'active',
            businessName: 'Euonex HQ',
            profession: 'Infrastructure',
            plan: 'growth',
            subscriptionStart: new Date().toISOString(),
            subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'admin-1',
            name: 'Abhinav Chaturvedi',
            email: 'chaturvediabhinav692@gmail.com',
            role: 'admin',
            status: 'approved',
            businessName: 'Leadzen',
            profession: 'System Administrator',
            plan: 'growth',
            subscriptionStart: new Date().toISOString(),
            subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'test-owner',
            name: 'Test Owner',
            email: 'test-owner@euonex.io',
            phone: '555-1111',
            profession: 'Business Expert',
            businessName: 'Professional Academy',
            city: 'Dubai',
            role: 'owner',
            status: 'pending',
            plan: 'growth'
        },
        {
            id: 'test-professional',
            name: 'Test Professional',
            email: 'test-professional@euonex.io',
            phone: '555-2222',
            profession: 'Service Provider',
            businessName: 'Service Agency',
            city: 'Pune',
            role: 'broker',
            status: 'pending',
            plan: 'starter'
        }
    ]);
    const [currentUser, setCurrentUser] = useState<any | null>(null);

    const registerUser = (userData: any) => {
        const profession = userData.profession?.toLowerCase() || '';
        let role = 'broker'; // default

        if (profession.includes('coach') || profession.includes('owner')) {
            role = 'owner';
        } else if (profession.includes('real estate')) {
            role = 'broker';
        }

        const newUser = {
            ...userData,
            id: `u${Date.now()}`,
            status: 'pending',
            role: role
        };
        setUsers(prev => [...prev, newUser]);
    };

    const approveUser = (userId: string) => {
        setUsers(prev => prev.map(u => {
            if (u.id === userId) {
                const subStart = new Date();
                const subEnd = new Date();
                subEnd.setMonth(subEnd.getMonth() + 1);

                return {
                    ...u,
                    status: 'approved',
                    subscriptionStart: subStart.toISOString(),
                    subscriptionEnd: subEnd.toISOString()
                };
            }
            return u;
        }));
    };

    const rejectUser = (userId: string) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'rejected' } : u));
    };

    const addTicket = (ticketData: Omit<Ticket, 'id' | 'createdDate' | 'status'>) => {
        const newTicket: Ticket = {
            ...ticketData,
            id: `t${Date.now()}`,
            status: 'Open',
            createdDate: new Date().toISOString()
        };
        setTickets(prev => [newTicket, ...prev]);
    };

    const resolveTicket = (id: string) => {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
    };



    const addNote = (clientId: string, note: string) => {
        setClients(prev => prev.map(client => {
            if (client.id === clientId) {
                const newActivity: Activity = {
                    id: Date.now().toString(),
                    type: 'note',
                    content: `Note added: ${note}`,
                    timestamp: new Date().toISOString()
                };
                // Append note to existing notes or just log it? User said "Notes section (editable)".
                // We'll update the main notes field specifically AND log the activity.
                return {
                    ...client,
                    notes: note, // Replacing notes as it's an editable field usually
                    activityHistory: [newActivity, ...client.activityHistory],
                    lastActivity: new Date().toISOString()
                };
            }
            return client;
        }));
    };

    const addActivity = (clientId: string, activityData: Omit<Activity, 'id' | 'timestamp'>) => {
        setClients(prev => prev.map(client => {
            if (client.id === clientId) {
                const newActivity: Activity = {
                    ...activityData,
                    id: Date.now().toString(),
                    timestamp: new Date().toISOString()
                };
                return {
                    ...client,
                    activityHistory: [newActivity, ...client.activityHistory],
                    lastActivity: new Date().toISOString()
                };
            }
            return client;
        }));
    };

    const addMessage = (clientId: string, text: string, sender: 'client' | 'bot' | 'broker') => {
        setClients(prev => prev.map(client => {
            if (client.id === clientId) {
                const newMessage = {
                    id: Date.now().toString(),
                    sender,
                    text,
                    timestamp: new Date().toISOString()
                };

                // If message is from broker, status might change to contacted if it was new
                let newStatus = client.status;
                if (sender === 'broker' && client.status === 'new') {
                    newStatus = 'assigned';
                }

                return {
                    ...client,
                    status: newStatus,
                    lastMessage: text,
                    lastActivity: new Date().toISOString(),
                    conversation: [...client.conversation, newMessage]
                };
            }
            return client;
        }));
    };

    const [activityLog, setActivityLog] = useState<{ type: string, text: string, time: string, user: string }[]>([]);

    // 1. Sort Helper
    const sortLeads = (leads: Client[]) => {
        const priorityScore = { hot: 3, warm: 2, cold: 1, new: 2, assigned: 2, converted: 0, snoozed: 0, rejected: 0 };
        return [...leads].sort((a, b) => {
            // First by status priority
            const pA = priorityScore[a.status as keyof typeof priorityScore] || 0;
            const pB = priorityScore[b.status as keyof typeof priorityScore] || 0;
            if (pA !== pB) return pB - pA;
            // Then by recency
            return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        });
    };

    // 2. Global Log Helper
    const logGlobalActivity = (type: string, text: string, user: string) => {
        setActivityLog(prev => [{ type, text, time: new Date().toISOString(), user }, ...prev].slice(0, 50));
    };

    // 3. Workflow Actions
    const callLead = (clientId: string) => {
        const client = clients.find(c => c.id === clientId);
        if (!client) return;

        // Simulating phone call
        window.location.href = `tel:${client.phone}`;

        // Update Activity
        const note = `Called ${client.name}`;
        addActivity(clientId, { type: 'call', content: note });
        logGlobalActivity('call', `Called ${client.name}`, 'Admin');
    };

    const whatsappLead = (clientId: string, message: string = "Hi, following up on your inquiry. Let me know a good time to connect.") => {
        const client = clients.find(c => c.id === clientId);
        if (!client) return;

        // Open WhatsApp
        window.open(`https://wa.me/${client.phone.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`, '_blank');

        // Update Activity
        const note = `WhatsApp: ${message}`;
        addActivity(clientId, { type: 'message', content: note });
        logGlobalActivity('message', `Messaged ${client.name}`, 'Admin');
    };

    const snoozeLead = (clientId: string, hours: number = 24) => {
        setClients(prev => prev.map(client => {
            if (client.id === clientId) {
                const snoozeUntil = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
                // Log local
                const newActivity: Activity = {
                    id: Date.now().toString(),
                    type: 'status_change',
                    content: `Snoozed until ${new Date(snoozeUntil).toLocaleString()}`,
                    timestamp: new Date().toISOString()
                };
                logGlobalActivity('status', `Snoozed ${client.name} for ${hours}h`, 'Admin');
                return {
                    ...client,
                    status: 'snoozed',
                    snoozeUntil,
                    activityHistory: [newActivity, ...client.activityHistory],
                    lastActivity: new Date().toISOString()
                };
            }
            return client;
        }));
    };

    // 4. Check Snooze (call this in useEffect or periodically)
    useEffect(() => {
        const interval = setInterval(() => {
            setClients(prev => prev.map(client => {
                if (client.status === 'snoozed' && client.snoozeUntil) {
                    if (new Date() > new Date(client.snoozeUntil)) {
                        // Wake up
                        return { ...client, status: 'new', snoozeUntil: undefined }; // Return to 'new' or previous? 'new' is safe.
                    }
                }
                return client;
            }));
        }, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);


    // Update Resolvers with key Logic
    const updateClientStatus = (clientId: string, status: ClientStatus) => {
        const client = clients.find(c => c.id === clientId);
        setClients(prev => prev.map(c => {
            if (c.id === clientId) {
                const newActivity: Activity = {
                    id: Date.now().toString(),
                    type: 'status_change',
                    content: `Status updated to ${status}`,
                    timestamp: new Date().toISOString()
                };
                return { ...c, status, activityHistory: [newActivity, ...c.activityHistory], lastActivity: new Date().toISOString() };
            }
            return c;
        }));
        if (client) logGlobalActivity('status', `Updated ${client.name} to ${status}`, role);
    };

    const assignBroker = (clientId: string, brokerId: string | null) => {
        const broker = brokers.find(b => b.id === brokerId);
        const client = clients.find(c => c.id === clientId);
        setClients(prev => prev.map(c => {
            if (c.id === clientId) {
                const newActivity: Activity = {
                    id: Date.now().toString(),
                    type: 'assignment',
                    content: broker ? `Assigned to ${broker.name}` : 'Broker unassigned',
                    timestamp: new Date().toISOString()
                };
                // If assigned, status becomes 'assigned' automatically if it was 'new'
                const newStatus = (c.status === 'new' && broker) ? 'assigned' : c.status;

                return { ...c, status: newStatus, assignedBrokerId: brokerId, activityHistory: [newActivity, ...c.activityHistory], lastActivity: new Date().toISOString() };
            }
            return c;
        }));
        if (client && broker) logGlobalActivity('assignment', `Assigned ${client.name} to ${broker.name}`, role);
    };

    const getClientById = (id: string) => clients.find(c => c.id === id);
    const getBrokerById = (id: string) => brokers.find(b => b.id === id);

    return (
        <StoreContext.Provider value={{
            role,
            setRole,
            users,
            currentUser,
            registerUser,
            approveUser,
            rejectUser,
            setCurrentUser,
            clients: sortLeads(clients), // Auto-sort on read
            brokers,
            tickets,
            platformClients,
            payments,
            activityLog,
            addTicket,
            resolveTicket,
            updateClientStatus,
            assignBroker,
            addNote,
            addActivity,
            addMessage,
            getClientById,
            getBrokerById,
            callLead,     // Exported
            whatsappLead, // Exported
            snoozeLead    // Exported
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};
