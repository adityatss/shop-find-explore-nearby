
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const corsMiddleware = require('./middleware/cors');
const shopRoutes = require('./routes/shops');
const authRoutes = require('./routes/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Add debugging middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  console.log('Request body:', req.body);
  next();
});

// Routes
app.use('/api/shops', shopRoutes);
app.use('/api/auth', authRoutes);

// Add a test route to verify auth routes are working
app.get('/api/auth/test', (req, res) => {
  res.json({ message: 'Auth routes are working!' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ShopExplore Backend API is running',
    timestamp: new Date().toISOString(),
    routes: {
      auth: '/api/auth',
      shops: '/api/shops'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'Not set'}`);
  console.log('Available routes:');
  console.log('- GET /api/health');
  console.log('- GET /api/auth/test');
  console.log('- POST /api/auth/register');
  console.log('- POST /api/auth/login');
  console.log('- GET /api/shops');
});
