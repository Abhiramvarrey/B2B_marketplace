const express = require('express');
const router = express.Router();
const {
  sendConnectionRequest,
  withdrawConnectionRequest,
  getConnections,
  removeconnection,
} = require('../controllers/connectionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/connect/:id', protect, sendConnectionRequest);
router.post('/withdraw/:id', protect, withdrawConnectionRequest);
router.get('/connections', protect, getConnections);
router.post('/remove/:id',protect,removeconnection);

module.exports = router;
