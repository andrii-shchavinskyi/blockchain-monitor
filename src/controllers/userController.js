const AuthService = require('../services/authService');
const User = require('../models/userModel');

const UserController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use.' });
      }

      // Hash the password and create the user
      const hashedPassword = await AuthService.hashPassword(password);
      const newUser = await User.createUser(email, hashedPassword);

      res.status(201).json({ message: 'User registered successfully.', user: newUser });
    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Validate password
      const isValidPassword = await AuthService.validatePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      // Generate JWT
      const token = AuthService.generateToken(user);

      res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },
};

module.exports = UserController;
