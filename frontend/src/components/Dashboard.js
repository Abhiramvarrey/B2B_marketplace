import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { AppProvider } from '@toolpad/core/AppProvider';
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
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import { DashboardLayout,ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import Logout from './Logout'; // Import your Logout component
import PostForm from '../Posts/Postsystem';
import ShopSearch from '../Connect/connectShop';
import { authService } from '../utils/authService'; // Import your authService
import Requirements from '../Requiremnts/requirements';
import logo from '../assets/logo.png';
import Profile from '../pages/updateprofile';
import PostDashboard from '../pages/getallPosts';
import Connections from '../Connect/connectList';
// Create a custom theme for the dashboard
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#f7f6f6',
          paper: '##fefdfc',
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: '#000000',
          paper: '#112E4D',
        },
      },
    },
  },
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
      <Requirements/>
    </Box>
  );
}

function PostContent() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <PostForm />
    </Box>
  );
}

function MyPostsContent() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4">My Posts</Typography>
      <PostDashboard />
      <Typography>View and manage your posts here.</Typography>
    </Box>
  );
}

function ConnectToShopsContent() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <ShopSearch />
    </Box>
  );
}

function MyConnectionsContent() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4">My Connections</Typography>
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
      <Profile />
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

function RequestPage() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Connections />
      <Typography>View and manage your requests here.</Typography>
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
      return <Logout onLogout={handleLogout} />;
    case '/my-requests':
      return <RequestPage />;
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
function ToolbarActionsSearch() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the token and update the state
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <ThemeSwitcher />
      <Tooltip title="Logout">
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
function SidebarFooter({ mini }) {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
    >
      {mini ? '© ABG' : `© ${new Date().getFullYear()} Made with love by Aushadhbridge`}
    </Typography>
  );
}

SidebarFooter.propTypes = {
  mini: PropTypes.bool.isRequired,
};

// Navigation and routing
function DashboardLayoutNavigationLinks(props) {
  const { window } = props;
  const router = useDemoRouter('/update-profile'); // Initially set to Update Profile
  const navigate = useNavigate(); // Hook to navigate


  // Check if the token is expired and redirect to login if it is
  useEffect(() => {
    if (authService.isTokenExpired()) {
      navigate('/login'); // Redirect to login page
    }
  }, [navigate]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={[
        { segment: 'requirements', title: 'Requirements', icon: <HomeIcon /> },
        { segment: 'post', title: 'Post', icon: <PostAddIcon /> },
        { segment: 'myposts', title: 'My Posts', icon: <ForumIcon /> },
        { segment: 'connect-to-shops', title: 'Connect to Shops', icon: <ShopIcon /> },
        { segment: 'my-requests', title: 'Requests', icon: <PendingActionsRoundedIcon /> },
        { segment: 'my-connections', title: 'My Connections', icon: <GroupIcon /> },
        { segment: 'subscription', title: 'Subscription', icon: <SubscriptionsIcon /> },
        { segment: 'update-profile', title: 'Update Profile', icon: <PersonIcon /> },
        { segment: 'notifications', title: 'Notifications', icon: <NotificationsIcon /> },
        { segment: 'logout', title: 'Logout', icon: <LogoutIcon /> },
      ]}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src = {logo} alt="medimarket logo" />,
        title: 'AUSHADH-BRIDGE',
      }}
    >
      
      <DashboardLayout
      slots={{
        toolbarActions: ToolbarActionsSearch,
        sidebarFooter: SidebarFooter,
      }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutNavigationLinks.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutNavigationLinks;