const ticketsService = require('../services/tickets.service');

const VALID_PRIORITIES = ["High", "Medium", "Low"];

const getTickets = (req, res) => {
    try {
        const tickets = ticketsService.getTickets();
        res.status(200).json({ success: true, data: tickets, error: null });
    } catch (error) {
        res.status(500).json({ success: false, data: null, error: error.message });
    }
};

const createTicket = (req, res) => {
    try {
        const { issueType, priority, description, image } = req.body;

        if (!issueType || !priority || !description) {
            return res.status(400).json({ success: false, data: null, error: "Missing required fields" });
        }

        if (!VALID_PRIORITIES.includes(priority)) {
            return res.status(400).json({
                success: false,
                data: null,
                error: `Invalid priority. Must be one of: ${VALID_PRIORITIES.join(', ')}`
            });
        }

        const newTicket = ticketsService.createTicket({ issueType, priority, description, image });
        res.status(201).json({ success: true, data: newTicket, error: null });
    } catch (error) {
        res.status(500).json({ success: false, data: null, error: error.message });
    }
};

const updateTicket = (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedTicket = ticketsService.updateTicket(id, updates);
        if (!updatedTicket) {
            return res.status(404).json({ success: false, data: null, error: "Not found" });
        }

        res.status(200).json({ success: true, data: updatedTicket, error: null });
    } catch (error) {
        res.status(500).json({ success: false, data: null, error: error.message });
    }
};

module.exports = {
    getTickets,
    createTicket,
    updateTicket
};
