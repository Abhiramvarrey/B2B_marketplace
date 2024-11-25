import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid2,
  Container,
  IconButton,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const PostForm = () => {
  const [items, setItems] = useState([{ name: "", quantity: "" }]);
  const [deadline, setDeadline] = useState("");
  const token = localStorage.getItem("token"); // Get JWT from local storage
  const theme = useTheme();

  // Function to handle changes in input fields
  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Function to add a new row for additional items
  const handleAddRow = () => {
    setItems([...items, { name: "", quantity: "" }]);
  };

  // Function to remove an item row
  const handleRemoveRow = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!token) {
      console.error("No token provided!");
      return;
    }

    const data = {
      items,
      deadline, // Include a single deadline for all items
    };

    try {
      const response = await axios.post("http://localhost:5000/api/posts", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Post created successfully:", response.data);
      // Reset form after submission
      setItems([{ name: "", quantity: "" }]);
      setDeadline("");
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
    }
  };

  return (
      <Container maxWidth="sm">
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom align="center">
            Create a New Post
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Items
          </Typography>

          {items.map((item, index) => (
            <Grid2 container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid2 item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Item Name"
                  value={item.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  required
                />
              </Grid2>
              <Grid2 item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleChange(index, "quantity", e.target.value)}
                  required
                />
              </Grid2>
              <Grid2 item xs={12} sm={1} sx={{ display: "flex", alignItems: "center" }}>
                <IconButton color="error" onClick={() => handleRemoveRow(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid2>
            </Grid2>
          ))}

          <Button variant="outlined" onClick={handleAddRow} sx={{ mb: 2 }}>
            Add Row
          </Button>

          <TextField
            fullWidth
            label="Deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
            required
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ width: "100%" }}
          >
            Submit Post
          </Button>
        </Box>
      </Container>
  );
};

export default PostForm;
