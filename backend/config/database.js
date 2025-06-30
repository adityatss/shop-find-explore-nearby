
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('=== DATABASE CONNECTION ===');
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log('Connection state:', mongoose.connection.readyState);
    console.log('Database name:', conn.connection.name);
    
    // Listen for connection events
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });
    
  } catch (error) {
    console.error('=== DATABASE CONNECTION ERROR ===');
    console.error('MongoDB connection error:', error);
    console.error('Error message:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
