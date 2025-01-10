import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles'; // Material-UI theme hook
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Grid2,
  Tooltip,
  IconButton,
  Alert,
} from '@mui/material';
import { Block } from '@mui/icons-material'; // Block icon
import axios from 'axios';

const SHOP_CATEGORIES = [
  'Grocery',
  'Electronics',
  'Clothing',
  'Bakery',
  'Restaurant',
  'Stationery',
  'Hardware',
  'Jewelry',
  'Pharmacy',
  'Cosmetics',
  'Furniture',
  'Bookstore',
  'Sports',
  'Toys',
  'Other',
];

const Profile = () => {
  const theme = useTheme(); // Get the current Material-UI theme (light or dark)
  const [profile, setProfile] = useState(null); // Set profile to null initially
  const [formData, setFormData] = useState({
    ownerName: '',
    shopLocation: '',
    shopCategory: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Profile data fetched successfully:', response.data); // Log the response to check the data
        setProfile(response.data);
        setFormData({
          ownerName: response.data.ownerName,
          shopLocation: response.data.shopLocation,
          shopCategory: response.data.shopCategory,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage({ type: 'error', text: 'Error fetching profile' });
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/profile/update`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage({ type: 'success', text: response.data.message });
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Error updating profile' });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If profile is still null, display a message
  if (!profile) {
    return (
      <Box sx={{ textAlign: 'center', padding: 3 }}>
        <Typography variant="h6" color="error">
          Profile data could not be fetched. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 3,
      }}
    >
      <Card
        sx={{
          width: '90%',
          maxWidth: 600,
          backgroundColor: theme.palette.background.paper, // Use the paper color from the theme
          color: theme.palette.text.primary, // Text color based on the theme
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
            Profile Details
          </Typography>
          {message && (
            <Alert severity={message.type} sx={{ marginBottom: 2 }}>
              {message.text}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={2}>
              <Grid2 item xs={12}>
                <Tooltip title="Blocked for editing" arrow>
                  <TextField
                    label="Email"
                    value={profile.email}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <IconButton disabled>
                          <Block sx={{ color: 'gray' }} />
                        </IconButton>
                      ),
                    }}
                  />
                </Tooltip>
              </Grid2>
              <Grid2 item xs={12}>
                <Tooltip title="Blocked for editing" arrow>
                  <TextField
                    label="Mobile"
                    value={profile.mobile}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <IconButton disabled>
                          <Block sx={{ color: 'gray' }} />
                        </IconButton>
                      ),
                    }}
                  />
                </Tooltip>
              </Grid2>
              <Grid2 item xs={12}>
                <Tooltip title="Blocked for editing" arrow>
                  <TextField
                    label="Shop Name"
                    value={profile.shopName}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <IconButton disabled>
                          <Block sx={{ color: 'gray' }} />
                        </IconButton>
                      ),
                    }}
                  />
                </Tooltip>
              </Grid2>
              <Grid2 item xs={12}>
                <TextField
                  label="Owner Name"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid2>
              <Grid2 item xs={12}>
                <TextField
                  label="Shop Location"
                  name="shopLocation"
                  value={formData.shopLocation}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid2>
              <Grid2 item xs={12}>
                <TextField
                  select
                  label="Shop Category"
                  name="shopCategory"
                  value={formData.shopCategory}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  {SHOP_CATEGORIES.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
            </Grid2>
            <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 3 }}>
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
