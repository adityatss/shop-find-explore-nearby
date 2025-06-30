
const express = require('express');
const User = require('../models/User');
const router = express.Router();

console.log('Auth routes file loaded successfully');

// Simple password hashing (in production, use bcrypt)
const hashPassword = (password) => {
  return Buffer.from(password).toString('base64');
};

const verifyPassword = (password, hashedPassword) => {
  return Buffer.from(password).toString('base64') === hashedPassword;
};

// Test route
router.get('/test', (req, res) => {
  console.log('Auth test route hit');
  res.json({ message: 'Auth routes are working!', timestamp: new Date().toISOString() });
});

// Register
router.post('/register', async (req, res) => {
  console.log('Register route hit with body:', req.body);
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      console.log('Password too short');
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
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
    console.log('User created successfully:', email);

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
  console.log('Login route hit with body:', req.body);
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    if (!verifyPassword(password, user.password)) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('Login successful for user:', email);
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

console.log('Auth routes configured: GET /test, POST /register, POST /login');

module.exports = router;
