const db = require('../config/database');

const Blockchain = {
  getAll: async () => {
    const query = 'SELECT id, name, network, type FROM blockchains';
    const result = await db.query(query);
    return result.rows;
  },
  findById: async (id) => {
    const query = 'SELECT id, name, network, type FROM blockchains WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  },
};

module.exports = Blockchain;
