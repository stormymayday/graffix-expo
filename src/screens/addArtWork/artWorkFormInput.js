import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Platform,
  Alert,
} from "react-native";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import QRCode from "react-native-qrcode-svg";
import HorizontalScrollOptions from "../../components/HorizontallScroll/horizontallScrollCategory";
import axios from "axios";

export default function ArtworkFormInput() {
  const [categories, setCategories] = useState([
    "Painting",
    "Ceramics",
    "Abstract",
    "Nature",
    "Photo",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [QrCodeNeeded, setQrCodeNeeded] = useState(false);

  function handleImage(uri) {
    setSelectedImage(uri);
  }

  async function handlePublish() {
    console.log(title, description, selectedCategory, selectedImage);
    if (!title || !description || !selectedCategory || !selectedImage) {
      Alert.alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", selectedCategory);

    if (selectedImage) {
      formData.append("file", {
        uri: selectedImage,
        name: `${title}.jpg`,
        type: "image/jpeg",
      });
    }

    try {
      const response = await axios.post(
        "https://graffix-server.onrender.com/api/v1/art",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      Alert.alert("Artwork published successfully");
    } catch (error) {
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
        console.log("Error response headers:", error.response.headers);
        Alert.alert(
          "Failed to publish artwork",
          error.response.data.msg || "Server responded with an error"
        );
      } else if (error.request) {
        console.log("Error request:", error.request);
        Alert.alert("Failed to publish artwork", "No response from server");
      } else {
        console.log("Error message:", error.message);
        Alert.alert("Failed to publish artwork", error.message);
      }
      console.log("Error config:", error.config);
    }
  }

  function generateQrCode(api) {
    console.log("Generating QR Code");
    QrCodeNeeded && setQrCodeValue(api);
  }

  function handleSelectCategory(category) {
    setSelectedCategory(category);
  }

  return (
    <View style={styles.container}>
      {qrCodeValue ? (
        <QRCode value={qrCodeValue} size={200} />
      ) : (
        <View style={styles.container}>
          <ImageUpload handleImage={handleImage} />
          <TextInput
            style={styles.input}
            placeholder="Name your Artwork"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write about your Artwork"
            placeholderTextColor="#999"
            multiline
            value={description}
            onChangeText={setDescription}
          />
          <HorizontalScrollOptions
            options={categories}
            handleSelectCategory={handleSelectCategory}
          />
          <Button
            title="Publish"
            style={styles.button}
            onPress={handlePublish}
          />
          <Button title="Cancel" style={styles.cancelButton} color="#999" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#000",
  },
  textArea: {
    height: 100,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  cancelButton: {
    color: "#000",
  },
});
