import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  Grid,
} from '@mui/material';
import axios from 'axios';

const QuoteTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [sentQuotes, setSentQuotes] = useState([]);
  const [receivedQuotes, setReceivedQuotes] = useState([]);

  // Fetch Sent Quotes
  const fetchMyQuotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/getmyquotes`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSentQuotes(data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  // Fetch Received Quotes
  const fetchReceivedQuotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/getreceivedquotes`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReceivedQuotes(data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  // Handle Accept Quote
  const handleAcceptQuote = async (quoteId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/acceptquote/${quoteId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Quote accepted successfully!');
      fetchReceivedQuotes(); // Refresh received quotes
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Failed to accept the quote.');
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    fetchMyQuotes();
    fetchReceivedQuotes();
  }, []);

  // Render Quotes
  const renderQuotes = (quotes, isReceived = false) => (
    <Grid container spacing={3}>
      {quotes.length > 0 ? (
        quotes.map((quote) => (
          <Grid item xs={12} sm={6} md={4} key={quote._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {isReceived ? `From: ${quote.sender}` : `To: ${quote.receiver}`}
                </Typography>
                <Typography color="textSecondary">
                  Total: ₹{quote.total}
                </Typography>
                <Box mt={2}>
                  <Typography variant="subtitle2">Items:</Typography>
                  {quote.items.map((item) => (
                    <Typography key={item._id}>
                      {item.name} - Qty: {item.quantity}, Price: ₹{item.price}
                    </Typography>
                  ))}
                </Box>
                {isReceived && (
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAcceptQuote(quote._id)}
                    >
                      Accept Quote
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography>No quotes found.</Typography>
      )}
    </Grid>
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Manage Quotes
      </Typography>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ mb: 2 }}
      >
        <Tab label="Sent Quotes" />
        <Tab label="Received Quotes" />
      </Tabs>
      {tabIndex === 0 && renderQuotes(sentQuotes)}
      {tabIndex === 1 && renderQuotes(receivedQuotes, true)}
    </Box>
  );
};

export default QuoteTabs;
