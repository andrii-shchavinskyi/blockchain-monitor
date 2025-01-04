const db = require('../config/database');

const Notification = {
  createNotification: async (alertId, message) => {
    const query = `
      INSERT INTO notifications (alert_id, message)
      VALUES ($1, $2) RETURNING *`;
    const values = [alertId, message];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  getNotificationsByAlertId: async (alertId) => {
    const query = 'SELECT * FROM notifications WHERE alert_id = $1 ORDER BY sent_at DESC';
    const result = await db.query(query, [alertId]);
    return result.rows;
  },
};

module.exports = Notification;
