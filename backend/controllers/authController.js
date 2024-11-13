const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
// Login User

exports.login = async (req, res) => {
    const { email, password } = req.body;
    // Validate request body
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            // Don't reveal if it's an invalid email or password
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            // Don't reveal if it's an invalid email or password
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Create JWT payload
        const payload = { userId: user.id };
        console.log(payload);
        // Generate JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token);
        // Return success response with token
        return res.json({ 
            success: true,
            token
        });
    } catch (err) {
        console.error('Server error: ', err); // Make sure to log errors for debugging
        return res.status(500).json({ error: 'Server Error' });
    }
};
exports.register = async (req, res) => {
    const { email, password,mobile, ownerName, shopName, shopLocation, shopCategory } = req.body;
    console.log(req.body);
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({email, password, mobile, ownerName, shopName, shopLocation, shopCategory });
        await user.save();

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};
