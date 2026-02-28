let { tickets } = require('../data');

const getTickets = () => {
    return tickets;
};

const getTicketById = (id) => {
    return tickets.find(t => t.id === id);
};

const createTicket = (ticketData) => {
    const newTicket = {
        id: `t${Date.now()}`,
        userId: "temp-user",
        userName: "Temp Admin",
        ...ticketData,
        status: "Open",
        createdDate: new Date().toISOString()
    };
    tickets.unshift(newTicket);
    return newTicket;
};

const updateTicket = (id, updates) => {
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) return null;

    tickets[index] = {
        ...tickets[index],
        ...updates
    };
    return tickets[index];
};

module.exports = {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket
};
