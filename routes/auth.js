const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// @desc    Register a new user
// @route   POST /auth/register
// @access  Public
router.post('/register', async (req, res) => {
  const { username, password, email, role } = req.body;
  if (!username || !password || !email || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, email, role });
  await user.save();

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.status(201).json({ token });
});

// @desc    Login a user
// @route   POST /auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.status(200).json({ token, role: user.role });
});

module.exports = router;
