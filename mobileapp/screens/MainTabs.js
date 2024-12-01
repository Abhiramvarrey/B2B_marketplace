import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { DefaultTheme } from 'react-native-paper';

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

export default function MainTabs() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const tabBarOptions = {
    activeTintColor: theme.colors.primary,
    inactiveTintColor: theme.colors.disabled,
    style: {
      backgroundColor: theme.colors.background,
    },
  };

  return (
    <PaperProvider theme={darkMode ? DarkTheme : DefaultTheme}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <TouchableOpacity>
          <Icon name="menu" size={30} color={theme.colors.onPrimary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.onPrimary }]}>Dashboard</Text>
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
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  link: {
    color: '#6200EE',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
