import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Typography,
  Grid2,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Collapse,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from 'axios';

const ShopSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [shops, setShops] = useState([]);
  const [expandedShop, setExpandedShop] = useState(null);

  // Fetch shops based on the search query
  const fetchShops = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/searchshop?query=${searchQuery}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  };

  // Trigger shop fetching whenever the search query changes
  useEffect(() => {
    if (searchQuery) {
      fetchShops();
    } else {
      setShops([]);
    }
  }, [searchQuery]);

  // Expand or collapse a shop's details
  const handleExpand = (shopId) => {
    setExpandedShop(expandedShop === shopId ? null : shopId);
  };

  // Handle connection or withdrawal actions
  const handleConnection = async (shopId, action) => {
    try {
      const endpoint =
        action === 'connect' ? `/api/connect/${shopId}` : `/api/withdraw/${shopId}`;
      await axios.post(`http://localhost:5000${endpoint}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchShops(); // Refresh the list to update connection statuses
    } catch (error) {
      console.error(`Error ${action === 'connect' ? 'connecting to' : 'withdrawing from'} shop:`, error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Shop Search
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for shops..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 4 }}
      />
      <Grid2 container spacing={3}>
        {shops.map((shop) => (
          <Grid2 item xs={12} sm={6} md={4} key={shop._id}>
            <Card variant="outlined" sx={{ position: 'relative', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {shop.shopName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {shop.shopCategory} • {shop.shopLocation}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Owner: {shop.ownerName}
                </Typography>
                <IconButton
                  onClick={() => handleExpand(shop._id)}
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                  {expandedShop === shop._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </CardContent>
              <Collapse in={expandedShop === shop._id} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Location: {shop.shopLocation}
                  </Typography>
                </CardContent>
              </Collapse>
              <CardActions sx={{ justifyContent: 'center' }}>
                {shop.connectionStatus === 'connected' && (
                  <Chip label="Connected" color="success" />
                )}
                {shop.connectionStatus === 'pending' && (
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => handleConnection(shop._id, 'withdraw')}
                  >
                    Withdraw Request
                  </Button>
                )}
                {shop.connectionStatus === 'none' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleConnection(shop._id, 'connect')}
                  >
                    Send Connection
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default ShopSearch;
