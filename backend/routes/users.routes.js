const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/', usersController.getUsers);
router.patch('/:id/role', usersController.updateUserRole);

module.exports = router;
