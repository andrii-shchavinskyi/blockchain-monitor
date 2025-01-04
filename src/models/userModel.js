const db = require('../config/database');

const User = {
  createUser: async (email, password) => {
    const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id, email, created_at`;
    const values = [email, password];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  getUserByEmail: async (email) => {
    const query = `
      SELECT id, email, password, created_at
      FROM users
      WHERE email = $1`;
    const result = await db.query(query, [email]);
    return result.rows[0];
  },
};

module.exports = User;
