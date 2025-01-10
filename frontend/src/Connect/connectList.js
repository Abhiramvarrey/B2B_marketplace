import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  Grid2,
} from '@mui/material';
import axios from 'axios';
const ConnectionRequests = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);


  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const {data} = await axios.get( `${process.env.REACT_APP_BACKEND_URL}/api/connections/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingRequests(data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchconnections = async() =>{
    try {
        const token = localStorage.getItem('token');
        const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/connections/connected`,{
        headers: { Authorization: `Bearer ${token}` },
      });
      // Separate requests into categories based on their status
      
      setAcceptedRequests(data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }
  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/connections/accept/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRequests();
      fetchconnections();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/connections/reject/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRequests();
      fetchconnections();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    fetchRequests();
    fetchconnections();
  }, []);
  const renderRequests = (requests, actionButtons = false) => (
    <Grid2 container spacing={3}>
      {requests.length > 0 ? (
        requests.map((request) => (
          <Grid2 item xs={12} sm={6} md={4} key={request._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{request.ownerName}</Typography>
                <Typography color="textSecondary">{request.shopName}</Typography>
                <Typography color="textSecondary">{request.email}</Typography>
                {actionButtons && (
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAccept(request._id)}
                      style={{ marginRight: '10px' }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid2>
        ))
      ) : (
        <Typography>No requests found.</Typography>
      )}
    </Grid2>
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Manage Connection Requests
      </Typography>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ mb: 2 }}
      >
        <Tab label="Requests" />
        <Tab label="connected" />
      </Tabs>
      {tabIndex === 0 && renderRequests(pendingRequests, true)}
      {tabIndex === 1 && renderRequests(acceptedRequests)}
    </Box>
  );
};

export default ConnectionRequests;