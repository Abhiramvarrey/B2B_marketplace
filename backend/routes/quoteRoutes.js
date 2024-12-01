const express = require('express');
const { createQuote, discardQuote, getsentquotes, getreceivedQuotes } = require('../controllers/quoteController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createQuote); // Create a quote
router.delete('/discard/:id', protect, discardQuote); // Discard a quote
router.get('/getmyquotes', protect,getsentquotes);
router.get('/getreceivedquotes',protect, getreceivedQuotes);
module.exports = router;
