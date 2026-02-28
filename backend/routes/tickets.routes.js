const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/tickets.controller');

router.get('/', ticketsController.getTickets);
router.post('/', ticketsController.createTicket);
router.patch('/:id', ticketsController.updateTicket);

module.exports = router;
