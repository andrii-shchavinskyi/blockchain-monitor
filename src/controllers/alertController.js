const Alert = require('../models/alertModel');

const AlertController = {
  createAlert: async (req, res) => {
    try {
      const { address, blockchainId } = req.body;
      const userId = req.user.id; // Assuming JWT middleware provides user info

      const newAlert = await Alert.createAlert(userId, address, blockchainId);
      res.status(201).json({ message: 'Alert created successfully.', alert: newAlert });
    } catch (error) {
      console.error('Error creating alert:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },

  getAlerts: async (req, res) => {
    try {
      const userId = req.user.id;

      const alerts = await Alert.getAlertsByUserId(userId);
      res.status(200).json({ alerts });
    } catch (error) {
      console.error('Error fetching alerts:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },
};

module.exports = AlertController;
