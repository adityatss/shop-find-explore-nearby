
const express = require('express');
const Shop = require('../models/Shop');
const router = express.Router();

// Get all shops
router.get('/', async (req, res) => {
  try {
    const shops = await Shop.find().sort({ createdAt: -1 });
    res.json(shops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get nearby shops
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 2 } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const radiusKm = parseFloat(radius);

    if (isNaN(latitude) || isNaN(longitude) || isNaN(radiusKm)) {
      return res.status(400).json({ error: 'Invalid coordinates or radius' });
    }

    const shops = await Shop.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: radiusKm * 1000 // Convert km to meters
        }
      }
    }).sort({ createdAt: -1 });

    res.json(shops);
  } catch (error) {
    console.error('Error fetching nearby shops:', error);
    res.status(500).json({ error: error.message });
  }
});

// Search shops
router.get('/search', async (req, res) => {
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
    console.error('Error searching shops:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get shop by ID
router.get('/:id', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    console.error('Error fetching shop:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid shop ID format' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Create shop
router.post('/', async (req, res) => {
  try {
    const shop = new Shop(req.body);
    const savedShop = await shop.save();
    res.status(201).json(savedShop);
  } catch (error) {
    console.error('Error creating shop:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update shop
router.put('/:id', async (req, res) => {
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
    console.error('Error updating shop:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid shop ID format' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete shop
router.delete('/:id', async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json({ message: 'Shop deleted successfully' });
  } catch (error) {
    console.error('Error deleting shop:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid shop ID format' });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
