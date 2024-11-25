const express = require('express');
const router = express.Router();
const { searchShops } = require('../controllers/shopController');
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware

// Apply protect middleware to the search route
router.get('/searchshop', protect, searchShops);

module.exports = router;
