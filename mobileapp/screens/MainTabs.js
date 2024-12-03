import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Posts') iconName = 'post-outline';
          else if (route.name === 'Quotes') iconName = 'file-document-outline';
          else if (route.name === 'Orders') iconName = 'cart-outline';
          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#777',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={PlaceholderScreen('Home')} />
      <Tab.Screen name="Posts" component={PlaceholderScreen('Posts')} />
      <Tab.Screen name="Quotes" component={PlaceholderScreen('Quotes')} />
      <Tab.Screen name="Orders" component={PlaceholderScreen('Orders')} />
    </Tab.Navigator>
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
});
