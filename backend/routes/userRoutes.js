const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users (for leaderboard)
router.get('/', userController.getAllUsers);

// Add a new user
router.post('/', userController.addUser);

module.exports = router;
