const User = require('../models/User');
const jwt = require('jsonwebtoken');
// Get all connection requests for the logged-in user
const getRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('requested', '_id ownerName shopName email');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.requested);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getConnected = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('connected', '_id ownerName shopName email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log(user);
    res.status(200).json(user.connected);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept a connection request
const acceptRequest = async (req, res) => {
  try {
    const requesterId = req.params.id;
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, async (err, user) => {
        if (err) {
          console.error("JWT verification error:", err); // Log error for debugging
          return res.status(401).json({ message: "Invalid token" }); // Respond with an error if token is invalid
        }
        req.user = user; // Attach user information to the request object
        
        user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (!user.requested.includes(requesterId)) {
          return res.status(400).json({ message: 'Request not found' });
        }

        // Remove from requested and add to connected
        user.requested = user.requested.filter((id) => id.toString() !== requesterId);
        user.connected.push(requesterId);

        const requester = await User.findById(requesterId);
        requester.connected.push(req.user._id);
        requester.pending = requester.pending.filter((id) => id.toString() !== req.user._id);
        await user.save();
        await requester.save();

        res.status(200).json({ message: 'Connection request accepted' });
  });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject a connection request
const rejectRequest = async (req, res) => {
  try {
    const requesterId = req.params.id;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.requested.includes(requesterId)) {
      return res.status(400).json({ message: 'Request not found' });
    }

    // Remove from requested
    user.requested = user.requested.filter((id) => id.toString() !== requesterId);
    await user.save();

    res.status(200).json({ message: 'Connection request rejected' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getRequests, acceptRequest, rejectRequest ,getConnected };
