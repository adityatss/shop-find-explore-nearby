
const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  location: {
    type: { 
      type: String, 
      enum: ['Point'], 
      default: 'Point' 
    },
    coordinates: { 
      type: [Number], 
      required: true,
      validate: {
        validator: function(coordinates) {
          return coordinates.length === 2;
        },
        message: 'Coordinates must contain exactly 2 numbers [longitude, latitude]'
      }
    }
  },
  posterUrl: {
    type: String,
    default: null
  },
  items: [{
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    quantity: { 
      type: Number, 
      required: true, 
      default: 0,
      min: 0
    }
  }],
  owner: { 
    type: String, 
    required: true,
    trim: true
  },
  phone: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true
  },
  openingHours: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true,
    trim: true
  },
  createdBy: { 
    type: String, 
    required: true 
  },
  isOpen: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true
});

// Create geospatial index for location-based queries
shopSchema.index({ location: '2dsphere' });

// Create text index for search functionality
shopSchema.index({
  name: 'text',
  description: 'text',
  category: 'text',
  'items.name': 'text'
});

module.exports = mongoose.model('Shop', shopSchema);
