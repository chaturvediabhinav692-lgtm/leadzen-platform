let { leads } = require('../data');

const getLeads = (unassigned) => {
    if (unassigned === 'true') {
        return leads.filter(l => !l.assignedBrokerId);
    }
    return leads;
};

const getLeadById = (id) => {
    return leads.find(l => l.id === id);
};

const updateLead = (id, updates) => {
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) return null;

    leads[index] = {
        ...leads[index],
        ...updates,
        lastActivityAt: Date.now()
    };
    return leads[index];
};

module.exports = {
    getLeads,
    getLeadById,
    updateLead
};
