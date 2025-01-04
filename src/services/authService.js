const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Load environment variables
require('dotenv').config();

const AuthService = {
  hashPassword: async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  },

  validatePassword: async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
  },

  generateToken: (user) => {
    const payload = { id: user.id, email: user.email };
    const secret = process.env.JWT_SECRET || 'your_jwt_secret';
    const options = { expiresIn: '1h' }; // Token expiration time
    return jwt.sign(payload, secret, options);
  },
};

module.exports = AuthService;
