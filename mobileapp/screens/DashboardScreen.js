import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Requirements = () => (
  <View style={styles.content}>
    <Text style={styles.text}>Requirements Section</Text>
  </View>
);

const Posts = () => (
  <View style={styles.content}>
    <Text style={styles.text}>My Posts Section</Text>
    <TouchableOpacity>
      <Text style={styles.link}>Add Post</Text>
    </TouchableOpacity>
  </View>
);

const Connections = () => (
  <View style={styles.content}>
    <Text style={styles.text}>Connections Section</Text>
    <TouchableOpacity>
      <Text style={styles.link}>Add Connection</Text>
    </TouchableOpacity>
  </View>
);

const Quotes = () => (
  <View style={styles.content}>
    <Text style={styles.text}>Sent Quotes Section</Text>
    <TouchableOpacity>
      <Text style={styles.link}>Received Quotes</Text>
    </TouchableOpacity>
  </View>
);

export default function Dashboard({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const tabBarOptions = {
    activeTintColor: darkMode ? '#FFF' : '#6200EE',
    inactiveTintColor: darkMode ? '#888' : '#AAA',
    style: {
      backgroundColor: darkMode ? '#121212' : '#FFF',
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color={darkMode ? '#FFF' : '#6200EE'} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: darkMode ? '#FFF' : '#6200EE' }]}>Dashboard</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Requirements') iconName = 'list-outline';
            else if (route.name === 'Posts') iconName = 'add-circle-outline';
            else if (route.name === 'Connections') iconName = 'people-outline';
            else if (route.name === 'Quotes') iconName = 'document-text-outline';
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={tabBarOptions}
      >
        <Tab.Screen name="Requirements" component={Requirements} />
        <Tab.Screen name="Posts" component={Posts} />
        <Tab.Screen name="Connections" component={Connections} />
        <Tab.Screen name="Quotes" component={Quotes} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#6200EE',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  link: {
    color: '#6200EE',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
