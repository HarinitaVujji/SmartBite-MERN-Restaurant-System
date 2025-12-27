const express = require('express');
const router = express.Router();
const FeedbackModel = require('../models/FeedbackModel'); // Ensure correct path

// POST route - Submit feedback
router.post('/', async (req, res) => {
  try {
    console.log("Received feedback:", req.body);
    const { name, email, message } = req.body;

    // Check for duplicate feedback (same email & message)
    const existingFeedback = await FeedbackModel.findOne({ email, message });
    if (existingFeedback) {
      return res.status(400).json({ message: 'Duplicate feedback detected!' });
    }

    const newFeedback = new FeedbackModel({ name, email, message });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Error submitting feedback' });
  }
});


// ✅ GET route - Fetch feedback (Sorted by latest first)
router.get('/', async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find().sort({ createdAt: -1 }); // 🔥 SORT HERE
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Error fetching feedback' });
  }
});

module.exports = router;
