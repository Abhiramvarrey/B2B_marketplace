import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon,
  PostAdd as PostAddIcon,
  Forum as ForumIcon,
  Shop as ShopIcon,
  Group as GroupIcon,
  Subscriptions as SubscriptionsIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import Logout from './Logout'; // Import your Logout component

// Create a custom theme for the dashboard
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Define content for each section
function RequirementsContent() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4">Requirements</Typography>
      <Typography>List and manage your requirements here.</Typography>
    </Box>
  );
}

function PostContent() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4">Post</Typography>
      <Typography>Create and share new posts here.</Typography>
    </Box>
  );
}

function MyPostsContent() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4">My Posts</Typography>
      <Typography>View and manage your posts here.</Typography>
    </Box>
  );
}

function ConnectToShopsContent() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4">Connect to Shops</Typography>
      <Typography>Find and connect with shops here.</Typography>
    </Box>
  );
}

function MyConnectionsContent() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4">My Connections</Typography>
      <Typography>View and manage your connections here.</Typography>
    </Box>
  );
}

function SubscriptionContent() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4">Subscription</Typography>
      <Typography>Manage your subscription here.</Typography>
    </Box>
  );
}

function UpdateProfileContent() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4">Update Profile</Typography>
      <Typography>Update your profile details here.</Typography>
    </Box>
  );
}

function NotificationsContent() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4">Notifications</Typography>
      <Typography>View and manage your notifications here.</Typography>
    </Box>
  );
}

// Content renderer based on the current route
function DemoPageContent({ pathname }) {
  const handleLogout = () => {
    // Clear the token and update the state
    localStorage.removeItem('token');
  };
  switch (pathname) {
    case '/requirements':
      return <RequirementsContent />;
    case '/post':
      return <PostContent />;
    case '/myposts':
      return <MyPostsContent />;
    case '/connect-to-shops':
      return <ConnectToShopsContent />;
    case '/my-connections':
      return <MyConnectionsContent />;
    case '/subscription':
      return <SubscriptionContent />;
    case '/update-profile':
      return <UpdateProfileContent />;
    case '/notifications':
      return <NotificationsContent />;
    case '/logout':
      return <Logout onLogout={handleLogout}/>;
    default:
      return (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h4">404</Typography>
          <Typography>Page not found.</Typography>
        </Box>
      );
  }
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// Navigation and routing
function DashboardLayoutNavigationLinks(props) {
  const { window } = props;
  const router = useDemoRouter('/update-profile'); // Initially set to Update Profile

  // Optional: Define a custom window for iframe support
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={[
        { segment: 'requirements', title: 'Requirements', icon: <HomeIcon /> },
        { segment: 'post', title: 'Post', icon: <PostAddIcon /> },
        { segment: 'myposts', title: 'My Posts', icon: <ForumIcon /> },
        { segment: 'connect-to-shops', title: 'Connect to Shops', icon: <ShopIcon /> },
        { segment: 'my-connections', title: 'My Connections', icon: <GroupIcon /> },
        { segment: 'subscription', title: 'Subscription', icon: <SubscriptionsIcon /> },
        { segment: 'update-profile', title: 'Update Profile', icon: <PersonIcon /> },
        { segment: 'notifications', title: 'Notifications', icon: <NotificationsIcon /> },
        { segment: 'logout', title: 'Logout', icon: <LogoutIcon /> },
      ]}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutNavigationLinks.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutNavigationLinks;
