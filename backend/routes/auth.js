
const express = require('express');
const User = require('../models/User');
const router = express.Router();

console.log('=== AUTH ROUTES MODULE ===');
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
  console.log('=== AUTH TEST ROUTE ===');
  console.log('Auth test route hit successfully');
  res.json({ 
    message: 'Auth routes are working!', 
    timestamp: new Date().toISOString(),
    route: '/api/auth/test'
  });
});

// Register
router.post('/register', async (req, res) => {
  console.log('=== REGISTER ROUTE ===');
  console.log('Register route hit with body:', req.body);
  console.log('Content-Type:', req.headers['content-type']);
  
  try {
    const { email, password, name } = req.body;
    
    console.log('Extracted fields:', { email, password: password ? '***' : undefined, name });
    
    if (!email || !password || !name) {
      console.log('Missing required fields - email:', !!email, 'password:', !!password, 'name:', !!name);
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      console.log('Password too short:', password.length, 'characters');
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    console.log('Checking if user exists with email:', email);
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    console.log('Creating new user...');
    // Create new user
    const hashedPassword = hashPassword(password);
    const user = new User({
      email,
      password: hashedPassword,
      name
    });

    console.log('Saving user to database...');
    await user.save();
    console.log('User created successfully:', email);

    // Return user data (without password)
    const { password: _, ...userData } = user.toObject();
    res.status(201).json({
      message: 'User registered successfully',
      user: userData
    });
  } catch (error) {
    console.error('=== REGISTRATION ERROR ===');
    console.error('Registration error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log('=== LOGIN ROUTE ===');
  console.log('Login route hit with body:', req.body);
  console.log('Content-Type:', req.headers['content-type']);
  
  try {
    const { email, password } = req.body;
    
    console.log('Extracted fields:', { email, password: password ? '***' : undefined });
    
    if (!email || !password) {
      console.log('Missing email or password - email:', !!email, 'password:', !!password);
      return res.status(400).json({ error: 'Email and password are required' });
    }

    console.log('Looking for user with email:', email);
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('User found, verifying password...');
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
    console.error('=== LOGIN ERROR ===');
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: error.message });
  }
});

console.log('=== AUTH ROUTES CONFIGURED ===');
console.log('Available auth routes:');
console.log('- GET /test');
console.log('- POST /register');
console.log('- POST /login');

module.exports = router;
