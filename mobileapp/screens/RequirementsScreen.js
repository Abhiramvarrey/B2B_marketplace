import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const RequirementsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [prices, setPrices] = useState({});
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Replace with your token
      const response = await axios.get(
        `http://10.0.2.2:5000/api/connected-posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(response.data.posts); // Update posts
      setTotalPages(response.data.totalPages); // Total pages for pagination
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data || error.message);
    }
  };

  const handleSendQuote = (post) => {
    setSelectedPost(post);
    const initialPrices = {};
    post.items.forEach((item) => {
      initialPrices[item.name] = 0;
    });
    setPrices(initialPrices);
    setTotal(0);
    setModalVisible(true);
  };

  const handlePriceChange = (name, value) => {
    const updatedPrices = { ...prices, [name]: parseFloat(value) || 0 };
    setPrices(updatedPrices);

    // Calculate the total price
    const calculatedTotal = Object.values(updatedPrices).reduce((acc, curr) => acc + curr, 0);
    setTotal(calculatedTotal);
  };

  const handleSubmitQuote = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const quoteItems = selectedPost.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: prices[item.name],
      }));

      const data = {
        receiver: selectedPost.userId,
        items: quoteItems,
        total,
      };

      await axios.post("http://10.0.2.2:5000/api/send-quote", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModalVisible(false);
      Alert.alert("Success", "Quote sent successfully!");
    } catch (error) {
      Alert.alert("Error", error.response?.data || error.message);
    }
  };

  const handleDiscard = () => {
    Alert.alert("Discard Quote", "Are you sure you want to discard?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => setModalVisible(false) },
    ]);
  };

  const renderPost = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.shopName}>{item.shopName}</Text>
      {item.items.map((item, index) => (
        <Text key={index} style={styles.itemText}>
          {item.name} - {item.quantity} -{" "}
          {new Date(item.deadline).toLocaleDateString()}
        </Text>
      ))}
      <TouchableOpacity
        style={styles.quoteButton}
        onPress={() => handleSendQuote(item)}
      >
        <Text style={styles.buttonText}>Send Quote</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Requirements</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={renderPost}
        contentContainerStyle={styles.listContainer}
        onEndReached={() => {
          if (page < totalPages) setPage((prev) => prev + 1);
        }}
        onEndReachedThreshold={0.5}
      />

      {/* Quote Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Send Quote to {selectedPost?.shopName}
            </Text>
            {selectedPost?.items.map((item) => (
              <View key={item.name} style={styles.itemRow}>
                <Text style={styles.itemLabel}>{item.name}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  keyboardType="numeric"
                  value={prices[item.name]?.toString() || ""}
                  onChangeText={(value) => handlePriceChange(item.name, value)}
                />
              </View>
            ))}
            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleDiscard}>
                <Text style={styles.buttonText}>Discard</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmitQuote}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 16 },
  card: { padding: 16, backgroundColor: "#ddd", marginBottom: 16, borderRadius: 8 },
  shopName: { fontSize: 18, fontWeight: "bold" },
  itemText: { marginVertical: 4 },
  quoteButton: { backgroundColor: "#007BFF", padding: 8, borderRadius: 4, marginTop: 8 },
  buttonText: { color: "#fff", textAlign: "center" },
  modalContainer: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 8 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  itemRow: { marginBottom: 12 },
  itemLabel: { fontSize: 16, fontWeight: "bold" },
  input: { borderBottomWidth: 1, marginTop: 4, padding: 4 },
  totalText: { fontSize: 18, fontWeight: "bold", textAlign: "right", marginTop: 16 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  cancelButton: { backgroundColor: "#FF3B30", padding: 10, borderRadius: 4 },
  submitButton: { backgroundColor: "#4CAF50", padding: 10, borderRadius: 4 },
});

export default RequirementsScreen;
