// routes/foodRoutes.js

const express = require('express');
const router = express.Router();
const Food = require('../models/FoodModel'); // ✅ Ensure correct path & file name

// @route GET /api/foods
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find(); // Fetch all food items
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ message: 'Server error fetching foods' });
  }
});

module.exports = router;
