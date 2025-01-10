import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid2,
} from "@mui/material";

const Requirements = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [prices, setPrices] = useState({});
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Fetch posts from connected users
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/connected-posts`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },

        });
        setPosts(response.data); // Update state with the fetched posts
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error.response?.data || error.message);
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (isoDate) => {
    const formattedDeadline = new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log(formattedDeadline);
  return formattedDeadline;
  };
  const handleSendQuote = (post) => {
    setSelectedPost(post);
    const initialPrices = {};
    post.items.forEach((item) => {
      initialPrices[item.name] = 0;
    });
    setPrices(initialPrices);
    setTotal(0);
    setOpen(true);
  };

  const handlePriceChange = (name, value) => {
    const updatedPrices = { ...prices, [name]: parseFloat(value) || 0 };
    setPrices(updatedPrices);

    // Calculate the total price
    const calculatedTotal = Object.values(updatedPrices).reduce((acc, curr) => acc + curr, 0);
    setTotal(calculatedTotal);
  };

  const handleSubmitQuote = async () => {
    try {
      const token = localStorage.getItem("token");
      const quoteItems = selectedPost.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: prices[item.name],
      }));
      console.log(quoteItems);
      const data = {
        receiver: selectedPost.userId,
        items: quoteItems,
        total,
      };

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/send-quote`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOpen(false);
      alert("Quote sent successfully!");
    } catch (error) {
      alert(error.response?.data || error.message);
    }
  };

  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard?")) {
      setOpen(false);
      setSelectedPost(null);
    }
  };

  return (
    <Box sx={{ py: 4, textAlign: "center" }}>
      <Typography variant="h4">Requirements</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2, mt: 4 }}>
        {posts.map((post) => (
          <Card
            key={post._id}
            sx={{
              width: 300,
              bgcolor: "black",
              color: "white",
              boxShadow: "0px 0px 20px neonBlue",
            }}
          >
            <CardContent>
              <Typography variant="h6">{post.shopName}</Typography>
              <ul>
                {post.items.map((item) => (
                  <li key={item.name}>
                    {item.name}
                  </li>
                ))}
              </ul>
              <Typography variant="h6">{formatDate(post.deadline)}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSendQuote(post)}
              >
                Send Quote
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Dialog for Sending Quote */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Send Quote</DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Shop Name: {selectedPost?.shopName}
          </Typography>
          <Grid2 container spacing={2}>
            {selectedPost?.items.map((item) => (
              <React.Fragment key={item.name}>
                <Grid2 item xs={4}>
                  <Typography>{item.name}</Typography>
                </Grid2>
                <Grid2 item xs={4}>
                  <Typography>Quantity: {item.quantity}</Typography>
                </Grid2>
                <Grid2 item xs={4}>
                  <TextField
                    label="Price"
                    type="number"
                    value={prices[item.name] || ""}
                    onChange={(e) => handlePriceChange(item.name, e.target.value)}
                    fullWidth
                  />
                </Grid2>
              </React.Fragment>
            ))}
          </Grid2>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Total: ${total.toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDiscard}>
            Discard
          </Button>
          <Button color="primary" onClick={handleSubmitQuote}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Requirements;
