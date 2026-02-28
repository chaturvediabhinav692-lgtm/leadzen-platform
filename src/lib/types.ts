export interface Client {
    id: string;
    name: string;
    phone: string;
    courseInterest: "2BHK Flat" | "3BHK Luxury" | "Penthouse" | "Villa" | "Commercial Plot";
    timeline: "Immediate" | "1-3 Months" | "Exploring";
    location: string;
    source: "WhatsApp" | "Call";
    status: "new" | "hot" | "warm" | "cold" | "assigned" | "converted" | "snoozed" | "rejected";
    assignedBrokerId: string | null;
    lastActivityAt: number;
}

export interface Ticket {
    id: string;
    userId: string;
    userName: string;
    issueType: "Technical" | "Billing" | "Feature Request" | "Other";
    priority: "High" | "Medium" | "Low";
    description: string;
    status: "Open" | "Resolved";
    createdDate: string;
}
