
const mongoose = require('mongoose');

console.log('=== USER MODEL ===');
console.log('Loading User model...');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

console.log('User model created successfully');
console.log('User model methods:', Object.getOwnPropertyNames(User));

module.exports = User;
