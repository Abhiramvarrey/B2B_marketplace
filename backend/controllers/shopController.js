const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Search shops by name
exports.searchShops = async (req, res) => {
    try {

    const { query } = req.query;

    // Fetch all shops matching the query
    const shops = await User.find({
        shopName: { $regex: query, $options: 'i' } // Case-insensitive search
    }).select('ownerName shopName shopLocation shopCategory _id'); // Return limited fields

    if (!shops || shops.length === 0) {
        return res.status(200).json({ message: 'No shops found' });
    }

    // Current user's ID from the token
    const currentUserId = req.user._id;

    // Filter out the current user's shop and add connection status
    const updatedShops = await Promise.all(
        shops
            .filter((shop) => shop._id.toString() !== currentUserId.toString()) // Remove the current user
            .map(async (shop) => {
                let connectionStatus = 'none';
                const user = await User.findById(currentUserId); // Get the user data from the DB

                if (user.connected.includes(shop._id)) {
                    connectionStatus = 'connected';
                } else if (user.pending.includes(shop._id)) {
                    connectionStatus = 'pending';
                }

                return { ...shop.toObject(), connectionStatus }; // Add connection status to shop object
            })
    );
    return res.status(200).json(updatedShops); // Send the updated shops data as response
    } catch (err) {
        console.error("Error searching for shops:", err);
        res.status(404).json({ message: 'Error searching for shops', error: err.message });
    }
};
