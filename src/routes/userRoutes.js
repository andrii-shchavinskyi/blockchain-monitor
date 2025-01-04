const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// User registration route
router.post('/register', UserController.register);

// User login route
router.post('/login', UserController.login);

module.exports = router;
