const express = require('express');
const NotificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get notifications for a specific alert
router.get('/:alertId', authMiddleware, NotificationController.getNotificationsByAlertId);

module.exports = router;
