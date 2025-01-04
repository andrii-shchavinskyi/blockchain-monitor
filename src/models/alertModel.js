const db = require('../config/database');

const Alert = {
  createAlert: async (userId, address, blockchainId) => {
    const query = `
      INSERT INTO alerts (user_id, address, blockchain_id)
      VALUES ($1, $2, $3) RETURNING *`;
    const values = [userId, address, blockchainId];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  getAlertsByUserId: async (userId) => {
    const query = 'SELECT * FROM alerts WHERE user_id = $1';
    const result = await db.query(query, [userId]);
    return result.rows;
  },

  getAllAlerts: async () => {
    const query = 'SELECT * FROM alerts';
    const result = await db.query(query);
    return result.rows;
  },
};

module.exports = Alert;
