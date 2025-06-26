
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Simple password hashing (in production, use bcrypt)
const hashPassword = (password) => {
  return Buffer.from(password).toString('base64');
};

const verifyPassword = (password, hashedPassword) => {
  return Buffer.from(password).toString('base64') === hashedPassword;
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create new user
    const hashedPassword = hashPassword(password);
    const user = new User({
      email,
      password: hashedPassword,
      name
    });

    await user.save();

    // Return user data (without password)
    const { password: _, ...userData } = user.toObject();
    res.status(201).json({
      message: 'User registered successfully',
      user: userData
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    if (!verifyPassword(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return user data (without password)
    const { password: _, ...userData } = user.toObject();
    res.json({
      message: 'Login successful',
      user: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
