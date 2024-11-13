import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../utils/authContext';  // Import useAuth to access auth context

function Logout() {
    const { logout } = useAuth(); // Access the logout function from context
    const navigate = useNavigate();  // Use useNavigate for redirection
    const theme = useTheme(); // Access the current theme for dark and light mode

    const handleLogout = () => {
        // Call logout from context, which will remove the token
        logout();

        // Redirect the user to the login page after logging out
        navigate('/login');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.palette.mode === 'dark' ? 'grey.1000' : 'grey.100',
                transition: 'background-color 0.3s ease',
            }}
        >
            <Paper
                elevation={12}
                sx={{
                    p: 4,
                    maxWidth: 400,
                    textAlign: 'center',
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Logout
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                    Are you sure you want to logout?
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogout}
                    sx={{
                        mt: 2,
                        backgroundColor: theme.palette.primary.main,
                        ':hover': { backgroundColor: theme.palette.primary.dark },
                    }}
                >
                    Yes, Logout
                </Button>
            </Paper>
        </Box>
    );
}

export default Logout;
