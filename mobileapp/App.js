import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/LoginScreen';
import Register from './screens/RegisterScreen';
import MainTabs from './screens/MainTabs';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
              <Icon
                name={isDarkMode ? 'white-balance-sunny' : 'weather-night'}
                size={24}
                color={isDarkMode ? '#FFD700' : '#333'}
              />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
        <Stack.Screen name="Dashboard" component = {(props) => <MainDrawer {...props} isDarkMode={isDarkMode} />}options={{
          title: 'Dashboard',
          drawerIcon: ({ color, size }) => <Icon name="view-dashboard-outline" color={color} size={size} />,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainDrawer({ isDarkMode }) {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#fff',
        },
        drawerActiveTintColor: isDarkMode ? '#fff' : '#000',
        drawerInactiveTintColor: isDarkMode ? '#aaa' : '#333',
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={MainTabs}
        options={{
          title: 'Dashboard',
          drawerIcon: ({ color, size }) => <Icon name="view-dashboard-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Profile Management"
        component={PlaceholderScreen('Profile Management')}
        options={{
          drawerIcon: ({ color, size }) => <Icon name="account-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Notification Center"
        component={PlaceholderScreen('Notification Center')}
        options={{
          drawerIcon: ({ color, size }) => <Icon name="bell-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Subscription Management"
        component={PlaceholderScreen('Subscription Management')}
        options={{
          drawerIcon: ({ color, size }) => <Icon name="credit-card-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={PlaceholderScreen('Logout')}
        options={{
          drawerIcon: ({ color, size }) => <Icon name="logout" color={color} size={size} />,
        }}
      />
    </Drawer.Navigator>
  );
}

function PlaceholderScreen(name) {
  return () => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  themeToggle: {
    marginRight: 15,
  },
});
