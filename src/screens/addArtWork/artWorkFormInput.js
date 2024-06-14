import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Platform } from "react-native";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import QRCode from "react-native-qrcode-svg";
import uploadImage from "../../utils/uploadImage";
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

  const userId = "6667c69c6d63b3a3edd164f5";

  function handleImage(uri) {
    setSelectedImage(uri);
  }

  async function handlePublish() {
    try {
      // const imageUrl = await uploadImage(selectedImage);
      // generateQrCode(imageUrl);

      console.log("Image URL:", imageUrl);

      const response = await axios.post("/api/v1/art", {
        title,
        description,
        category: selectedCategory,
        artworkUrl: selectedImage,
        artworkPublicID: imageUrl.split("/").pop(),
      });

      console.log("Artwork created:", response.data);
    } catch (error) {
      console.error("Error publishing artwork:", error);
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
            onSelect={handleSelectCategory}
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
