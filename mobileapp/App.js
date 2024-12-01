import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/LoginScreen';
import Register from './screens/RegisterScreen';
import MainTabs from './screens/MainTabs';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
        <Stack.Screen name="Main" component={MainDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={MainTabs} options= {{ title: 'Dashboard'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={MainTabs} />
      <Drawer.Screen name="Profile Management" component={PlaceholderScreen('Profile Management')} />
      <Drawer.Screen name="Notification Center" component={PlaceholderScreen('Notification Center')} />
      <Drawer.Screen name="Logout" component={PlaceholderScreen('Logout')} />
      <Drawer.Screen name="Subscription Management" component={PlaceholderScreen('Subscription Management')} />
    </Drawer.Navigator>
  );
}

function PlaceholderScreen(name) {
  return () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{name}</Text>
    </View>
  );
}
