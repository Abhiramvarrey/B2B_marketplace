const User= require('../models/User');
const jwt = require('jsonwebtoken');
exports.sendConnectionRequest = async (req, res) => {
  try {
    const userId = req.user._id; // Current user
    const shopId = req.params.id.replace(':', ''); // Remove any leading colon

    await User.findByIdAndUpdate(userId, { $addToSet: { pending: shopId } }, { new: true });
    await User.findByIdAndUpdate(shopId, { $addToSet: { requested: userId } }, { new: true });

    res.status(200).json({ message: 'Connection request sent' });
  } catch (err) {
    console.error('Connection Request Error:', err);
    res.status(500).json({ message: 'Error sending connection request', error: err.message });
  }
};
  exports.withdrawConnectionRequest = async (req, res) => {
    try {
      const userId = req.user._id;
      const shopId = req.params.id;

      await User.findByIdAndUpdate(userId, { $pull: { pending: shopId } }, { new: true });
      await User.findByIdAndUpdate(shopId, { $pull: { requested: userId } }, { new: true });

      res.status(200).json({ message: 'Connection request withdrawn' });
    } catch (err) {
      res.status(500).json({ message: 'Error withdrawing connection request', error: err.message });
    }
  };
  
  exports.getConnections = async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId)
        .populate('connected', 'shopName')
        .populate('pending', 'shopName')
        .populate('requested', 'shopName');
  
      res.status(200).json({
        connected: user.connected,
        pending: user.pending,
        requested: user.requested,
      });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching connections', error: err.message });
    }
  };
  exports.removeconnection = async (req, res) => {
    try {
      const userId = req.user._id;
      const shopId = req.params.id;

      await User.findByIdAndUpdate(userId, { $pull: { connected: shopId } }, { new: true });
      await User.findByIdAndUpdate(shopId, { $pull: { connected: userId } }, { new: true });

      res.status(200).json({ message: 'Connection request withdrawn' });
    } catch (err) {
      res.status(500).json({ message: 'Error withdrawing connection request', error: err.message });
    }
  };
  