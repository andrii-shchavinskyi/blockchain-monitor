const express = require('express');
const AlertController = require('../controllers/alertController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect alert routes
router.post('/create', authMiddleware, AlertController.createAlert);
router.get('/', authMiddleware, AlertController.getAlerts);

module.exports = router;
