const express = require("express");
const { authenticateToken, createPost } = require("../controllers/postController");
const { getConnectedPosts, sendQuote,getAllPosts } = require('../controllers/postController');


const router = express.Router();

// Route to create a post
router.post("/posts", authenticateToken, createPost);
router.get('/connected-posts', authenticateToken, getConnectedPosts); // Get posts of connected users
router.post('/send-quote', authenticateToken, sendQuote); // Send a quote
router.get('/getmyposts',authenticateToken,getAllPosts);

module.exports = router;