const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getProfile,
  updateProfile,
  verifyProfileUpdate,
} = require('../controllers/profileController');

const router = express.Router();

router.get('/profile', protect, getProfile); // Get profile
router.post('/profile/update', protect, updateProfile); // Update profile and send verification email
router.get('/profile/verify/:token', verifyProfileUpdate); // Verify profile update

module.exports = router;
