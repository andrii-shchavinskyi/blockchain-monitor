const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret';
    const decoded = jwt.verify(token, secret);

    // Attach user data to the request
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    console.error('Invalid token:', error.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
