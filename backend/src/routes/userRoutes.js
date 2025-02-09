const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure correct path
const { authenticateUser } = require('../middleware/auth');

// This route uses the getVendors callback from userController
router.get('/vendors', authenticateUser, userController.getVendors);

module.exports = router;