const leadsService = require('../services/leads.service');

const VALID_STATUSES = ["new", "hot", "warm", "cold", "assigned", "converted", "snoozed", "rejected"];

const getLeads = (req, res) => {
    try {
        const { unassigned } = req.query;
        const leads = leadsService.getLeads(unassigned);
        res.status(200).json({ success: true, data: leads, error: null });
    } catch (error) {
        res.status(500).json({ success: false, data: null, error: error.message });
    }
};

const updateLead = (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.status && !VALID_STATUSES.includes(updates.status)) {
            return res.status(400).json({
                success: false,
                data: null,
                error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`
            });
        }

        const updatedLead = leadsService.updateLead(id, updates);
        if (!updatedLead) {
            return res.status(404).json({ success: false, data: null, error: "Not found" });
        }

        res.status(200).json({ success: true, data: updatedLead, error: null });
    } catch (error) {
        res.status(500).json({ success: false, data: null, error: error.message });
    }
};

module.exports = {
    getLeads,
    updateLead
};
