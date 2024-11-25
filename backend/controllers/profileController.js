const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update profile and send verification email
const updateProfile = async (req, res) => {
  const { ownerName, shopLocation, shopCategory } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update allowed fields
    user.ownerName = ownerName || user.ownerName;
    user.shopLocation = shopLocation || user.shopLocation;
    user.shopCategory = shopCategory || user.shopCategory;

    // Generate verification token
    const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
    console.log(verificationToken);
    // Send verification email
    const transporter = nodemailer.createTransport({
        host: 'Outlook', // Outlook's SMTP server
        port: 587,                 // Port for secure connections
        secure: false,             // Use STARTTLS
        auth: {
          user: process.env.EMAIL_USER, // Your Outlook or domain-specific email
          pass: "wnfuhruvwxcucbur", // Your email password or app password
        },
      });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Profile Update Verification',
      html: `
        <p>Click the link below to verify your profile update:</p>
        <a href="${process.env.FRONTEND_URL}/verify-profile/${verificationToken}">
          Verify Profile Update
        </a>
      `,
    };
    
    const mailing = await transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      }else{
        console.log('Email sent: ' + info.response);
      }
    });
    console.log(mailing);
    res.status(200).json({
      message: 'Verification email sent. Please verify to update your profile.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Verify profile update
const verifyProfileUpdate = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Save updated user data
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token', error });
  }
};

module.exports = { getProfile, updateProfile, verifyProfileUpdate };
