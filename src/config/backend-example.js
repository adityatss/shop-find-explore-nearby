
// Example Express.js + MongoDB backend configuration
// Save this as a separate project and deploy it to your preferred hosting service

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopexplore');

// Shop Schema
const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  posterUrl: String,
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 }
  }],
  owner: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  openingHours: { type: String, required: true },
  category: { type: String, required: true },
  createdBy: { type: String, required: true },
  isOpen: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Create geospatial index for location-based queries
shopSchema.index({ location: '2dsphere' });

const Shop = mongoose.model('Shop', shopSchema);

// Routes

// Get all shops
app.get('/api/shops', async (req, res) => {
  try {
    const shops = await Shop.find().sort({ createdAt: -1 });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get nearby shops
app.get('/api/shops/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 2 } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const shops = await Shop.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      }
    }).sort({ createdAt: -1 });

    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get shop by ID
app.get('/api/shops/:id', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create shop
app.post('/api/shops', async (req, res) => {
  try {
    const shop = new Shop(req.body);
    const savedShop = await shop.save();
    res.status(201).json(savedShop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update shop
app.put('/api/shops/:id', async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete shop
app.delete('/api/shops/:id', async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json({ message: 'Shop deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search shops
app.get('/api/shops/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const shops = await Shop.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { 'items.name': { $regex: q, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* 
To use this backend:

1. Create a new Node.js project:
   mkdir shopexplore-backend
   cd shopexplore-backend
   npm init -y

2. Install dependencies:
   npm install express mongoose cors dotenv

3. Create .env file:
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=https://your-lovable-app.lovable.app
   PORT=3001

4. Save this code as server.js

5. Add to package.json scripts:
   "start": "node server.js",
   "dev": "nodemon server.js"

6. Deploy to Render, Railway, or Vercel

7. Update REACT_APP_API_URL in your Lovable app to point to your deployed backend
*/
