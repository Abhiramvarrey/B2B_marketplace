const express = require('express');
const { createQuote, discardQuote } = require('../controllers/quoteController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createQuote); // Create a quote
router.delete('/discard/:id', protect, discardQuote); // Discard a quote

module.exports = router;
