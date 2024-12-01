import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    shopName: '',
    shopLocation: '',
    shopCategory: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { name, email, password, shopName, shopLocation, shopCategory } = formData;

    if (!name || !email || !password || !shopName || !shopLocation || !shopCategory) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);

      if (response.data.success) {
        Alert.alert('Registration Successful', 'You can now log in with your credentials.');
        navigation.navigate('Login'); // Navigate to Login screen
      } else {
        Alert.alert('Registration Failed', response.data.message || 'Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Shop Name"
        value={formData.shopName}
        onChangeText={(text) => handleChange('shopName', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Shop Location"
        value={formData.shopLocation}
        onChangeText={(text) => handleChange('shopLocation', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Shop Category"
        value={formData.shopCategory}
        onChangeText={(text) => handleChange('shopCategory', text)}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#6200EE" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200EE',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    color: '#6200EE',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
