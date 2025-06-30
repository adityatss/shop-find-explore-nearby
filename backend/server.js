
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const corsMiddleware = require('./middleware/cors');
const shopRoutes = require('./routes/shops');
const authRoutes = require('./routes/auth');

const app = express();

console.log('=== SERVER STARTUP ===');
console.log('Environment variables loaded');
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');

// Connect to MongoDB
connectDB();

// Middleware
console.log('Setting up CORS middleware...');
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Add debugging middleware to log all requests
app.use((req, res, next) => {
  console.log(`\n=== INCOMING REQUEST ===`);
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  console.log('Headers:', req.headers);
  console.log('Request body:', req.body);
  console.log('Query params:', req.query);
  next();
});

console.log('Loading routes...');

// Routes
console.log('Mounting shop routes at /api/shops');
app.use('/api/shops', shopRoutes);

console.log('Mounting auth routes at /api/auth');
app.use('/api/auth', authRoutes);

// Add a test route to verify auth routes are working
app.get('/api/auth/test', (req, res) => {
  console.log('Direct auth test route hit');
  res.json({ message: 'Auth routes are working!' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check endpoint hit');
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

// Debug route to list all registered routes
app.get('/api/debug/routes', (req, res) => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods)
      });
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push({
            path: handler.route.path,
            methods: Object.keys(handler.route.methods)
          });
        }
      });
    }
  });
  res.json({ routes });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`\n=== 404 ERROR ===`);
  console.log(`Route not found: ${req.method} ${req.originalUrl}`);
  console.log('Available routes should be:');
  console.log('- GET /api/health');
  console.log('- GET /api/auth/test');
  console.log('- POST /api/auth/register');
  console.log('- POST /api/auth/login');
  console.log('- GET /api/shops');
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('\n=== GLOBAL ERROR ===');
  console.error('Error:', error);
  console.error('Stack:', error.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('\n=== SERVER STARTED ===');
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'Not set'}`);
  console.log('\n=== AVAILABLE ROUTES ===');
  console.log('- GET /api/health');
  console.log('- GET /api/auth/test');
  console.log('- GET /api/debug/routes');
  console.log('- POST /api/auth/register');
  console.log('- POST /api/auth/login');
  console.log('- GET /api/shops');
  console.log('\n=== TEST URLS FOR POSTMAN ===');
  console.log(`- GET  http://localhost:${PORT}/api/health`);
  console.log(`- GET  http://localhost:${PORT}/api/auth/test`);
  console.log(`- POST http://localhost:${PORT}/api/auth/register`);
  console.log(`- POST http://localhost:${PORT}/api/auth/login`);
  console.log('========================');
});
