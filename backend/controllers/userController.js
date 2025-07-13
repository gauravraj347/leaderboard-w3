const User = require('../models/user');

// Get all users (sorted by totalPoints desc)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const existing = await User.findOne({ name });
    if (existing) return res.status(400).json({ error: 'User already exists' });
    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user' });
  }
};
