const Post = require("../models/Posts");
const User = require('../models/User');
const Quote = require('../models/Quotes');
const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
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

// Controller to create a new post
const createPost = async (req, res) => {
  try {
    const { items ,deadline } = req.body;

    // Check if items is provided and has data
    if (!items || items.length === 0) {
      return res.status(200).json({ message: "Items are required" });
    }
    // Get userId and shopName from JWT token
    const { _id: userId, shopName } = req.user;
    // Save data to database
    const newPost = new Post({
      userId,
      shopName,
      items,
      deadline,
    });

    const savedPost = await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Fetch posts from connected users
const getConnectedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('connected', '_id');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const connectedUserIds = user.connected.map((conn) => conn._id);
    const posts = await Post.find({ userId: { $in: connectedUserIds } });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send a quote
const sendQuote = async (req, res) => {
  try {
    const sender = req.user._id;
    const { receiver, items, total } = req.body;

    if (!sender || !receiver || !items || !total) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new quote object
    const quote = new Quote({
      sender,
      receiver,
      items,
      total,
    });

    // Find the post associated with the receiver
    const post = await Post.findOne({ userId: receiver });

    if (!post) {
      return res.status(404).json({ message: "Post not found for the receiver" });
    }

    // Add the sender's ID to the `quoteReceived` array if not already present
    if (!post.quoteReceived.includes(sender)) {
      post.quoteReceived.push(sender);
    }

    // Save the updated post
    await post.save();

    // Save the new quote
    const savedQuote = await quote.save();

    console.log(savedQuote);
    res.status(201).json({ message: "Quote sent successfully", quote: savedQuote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const posts = await Post.find({userId: req.user._id})
      .populate("userId", "name email")
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();

    const total = await Post.countDocuments();

    res.status(200).json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { 
  getConnectedPosts, 
  sendQuote ,  
  authenticateToken,
  createPost,
  getAllPosts,
};
