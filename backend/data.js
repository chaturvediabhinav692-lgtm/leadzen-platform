const leads = [
    {
        id: "c1",
        name: "Aarav Patel",
        phone: "+91 9900000000",
        courseInterest: "2BHK Flat",
        timeline: "Immediate",
        location: "South Mumbai",
        source: "WhatsApp",
        status: "new",
        assignedBrokerId: null,
        lastActivityAt: Date.now()
    },
    {
        id: "c2",
        name: "Vihaan Sharma",
        phone: "+91 9900001234",
        courseInterest: "3BHK Luxury",
        timeline: "1-3 Months",
        location: "Bandra West",
        source: "Call",
        status: "hot",
        assignedBrokerId: "broker_1",
        lastActivityAt: Date.now() - 3600000
    },
    {
        id: "c3",
        name: "Ananya Iyer",
        phone: "+91 9900005678",
        courseInterest: "Villa",
        timeline: "Exploring",
        location: "Powai",
        source: "WhatsApp",
        status: "cold",
        assignedBrokerId: null,
        lastActivityAt: Date.now() - 86400000
    }
];

const tickets = [
    {
        id: "t1",
        userId: "broker_1",
        userName: "John Doe",
        issueType: "Technical",
        priority: "High",
        description: "Dashboard loading slowly on mobile data.",
        status: "Open",
        createdDate: new Date().toISOString()
    },
    {
        id: "t2",
        userId: "owner_1",
        userName: "Apex Business",
        issueType: "Billing",
        priority: "Medium",
        description: "Need invoice for October subscription.",
        status: "Resolved",
        createdDate: new Date(Date.now() - 172800000).toISOString()
    }
];

module.exports = { leads, tickets };
