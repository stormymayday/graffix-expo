import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import QRCode from "react-native-qrcode-svg";
import HorizontalScrollOptions from "../../components/HorizontallScroll/horizontallScrollCategory";
import axios from "axios";
import ViewShot from "react-native-view-shot";

export default function ArtworkFormInput({ route }) {
  const { artWork } = route.params;

  const [categories, setCategories] = useState([
    "oil",
    "panting",
    "Abstract",
    "Nature",
    "Photo",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [QrCodeNeeded, setQrCodeNeeded] = useState(!artWork);
  const viewShotRef = useRef(null);
  let treasureId = "123456";

  let flagApi = "art";
  let flagApi2 = "artwork";

  if (QrCodeNeeded) {
    flagApi = "treasure";
    flagApi2 = "treasure";
  }

  function handleImage(uri) {
    setSelectedImage(uri);
  }

  async function handlePublish() {
    if (!title || !description || !selectedCategory || !selectedImage) {
      Alert.alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", selectedCategory.toLowerCase());

    if (QrCodeNeeded) {
      formData.append("message", message);
      formData.append("longitude", -73.935242);
      formData.append("latitude", 40.73061);
    }

    if (selectedImage) {
      formData.append(flagApi2, {
        uri: selectedImage,
        name: `${title}.jpg`,
        type: "image/jpeg",
      });
    }

    try {
      const response = await axios.post(
        `https://graffix-server.onrender.com/api/v1/${flagApi}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (QrCodeNeeded) {
        treasureId = response.data.treasure._id;
        setQrCodeValue(treasureId);
        // Wait for the state to update and QR code to render
        setTimeout(captureQRCode, 1000);
      }
      Alert.alert("Artwork published successfully");
    } catch (error) {
      if (error.response) {
        Alert.alert(
          "Failed to publish artwork",
          error.response.data.msg || "Server responded with an error"
        );
      } else if (error.request) {
        Alert.alert("Failed to publish artwork", "No response from server");
      } else {
        Alert.alert("Failed to publish artwork", error.message);
      }
    }
  }

  function handleSelectCategory(category) {
    setSelectedCategory(category);
  }

  const captureQRCode = async () => {
    if (viewShotRef.current) {
      const uri = await viewShotRef.current.capture();
      uploadQRCodeImage(uri);
    }
  };

  const uploadQRCodeImage = async (uri) => {
    const formData = new FormData();
    console.log("Treasure URI is: " + uri);
    formData.append("category", selectedCategory.toLowerCase());
    formData.append("qrcode", {
      uri,
      name: "qr-code.png",
      type: "image/png",
    });

    try {
      console.log("Treasure ID is: " + treasureId);
      const response = await axios.patch(
        `https://graffix-server.onrender.com/api/v1/treasure/${treasureId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Alert.alert("QR code uploaded successfully");
    } catch (error) {
      Alert.alert("Failed to upload QR code", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {qrCodeValue ? (
          <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1.0 }}>
            <QRCode value={qrCodeValue} size={200} />
          </ViewShot>
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
            {QrCodeNeeded && (
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Message for the treasure hunter"
                placeholderTextColor="#999"
                multiline
                value={message}
                onChangeText={setMessage}
              />
            )}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    width: Dimensions.get("window").width,
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
