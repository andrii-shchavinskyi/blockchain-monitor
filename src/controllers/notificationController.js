const Notification = require('../models/notificationModel');

const NotificationController = {
  getNotificationsByAlertId: async (req, res) => {
    try {
      const { alertId } = req.params;
      const notifications = await Notification.getNotificationsByAlertId(alertId);
      res.status(200).json({ notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },
};

module.exports = NotificationController;
