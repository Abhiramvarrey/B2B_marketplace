import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

const PostForm = () => {
  const [items, setItems] = useState([{ name: "", quantity: "" }]);
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to handle changes in input fields
  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Function to add a new row for additional items
  const handleAddRow = () => {
    setItems([...items, { name: "", quantity: "" }]);
  };

  // Function to remove an item row
  const handleRemoveRow = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("token"); // Get JWT from AsyncStorage
    if (!token) {
      Alert.alert("Error", "No token provided!");
      return;
    }

    const data = {
      items,
      deadline: deadline.toISOString(), // Format the date
    };

    try {
      const response = await axios.post("http://localhost:5000/api/posts", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert("Success", "Post created successfully!");
      // Reset form after submission
      setItems([{ name: "", quantity: "" }]);
      setDeadline(new Date());
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create post."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a New Post</Text>

      <Text style={styles.subtitle}>Items</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={item.name}
            onChangeText={(value) => handleChange(index, "name", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="numeric"
            value={item.quantity}
            onChangeText={(value) => handleChange(index, "quantity", value)}
          />
          <TouchableOpacity onPress={() => handleRemoveRow(index)}>
            <Icon name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddRow}>
        <Text style={styles.addButtonText}>Add Row</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePickerText}>
          Select Deadline: {deadline.toDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={deadline}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDeadline(selectedDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  datePickerText: {
    marginTop: 20,
    fontSize: 16,
    color: "#007bff",
    textAlign: "center",
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

expor
