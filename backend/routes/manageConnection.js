const express = require('express');
const { getRequests, acceptRequest, rejectRequest ,getConnected } = require('../controllers/manageconnectionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/requests', protect, getRequests); // Get all connection requests
router.post('/accept/:id', protect, acceptRequest); // Accept a connection request
router.post('/reject/:id', protect, rejectRequest); // Reject a connection request
router.get('/connected',protect,getConnected);
module.exports = router;
