const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });
  
  // Extract the token from "Bearer <token>" format
  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err); // Log error for debugging
      return res.status(403).json({ message: "Invalid token." });
    }
    console.log("Decoded user:", user); // Log the decoded user for debugging
    req.user = user; // Attach user information to the request object
    next();
  });
};
