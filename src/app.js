const express = require('express');
const userRoutes = require('./routes/userRoutes');
const alertRoutes = require('./routes/alertRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

// Middleware
app.use(express.json());

// User routes
app.use('/users', userRoutes);
app.use('/alerts', alertRoutes);
app.use('/notifications', notificationRoutes);

module.exports = app;
