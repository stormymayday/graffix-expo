import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import MapView, { Marker } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function ArtDetail({ route, navigation }) {
  const { item } = route.params;
  const [location, setLocation] = useState(null);
  const [pinLocation, setPinLocation] = useState(null);
  const [isEditing, setIsEditing] = useState({});
  const [editableItem, setEditableItem] = useState({ ...item });
  const [newImage, setNewImage] = useState(null);
  let flag = "art";

  useEffect(() => {
    if (item.location) {
      setLocation({
        latitude: item.location.coordinates[1],
        longitude: item.location.coordinates[0],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setPinLocation({
        latitude: item.location.coordinates[1],
        longitude: item.location.coordinates[0],
      });
    }

    if (item.imageUrl) {
      setEditableItem((prev) => ({ ...prev, artwork: item.imageUrl }));
    }
  }, [item.location, item.imageUrl]);

  useEffect(() => {
    console.log(pinLocation);
  }, [pinLocation]);

  const handleFieldEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleDownloadQRCode = async () => {
    try {
      const uri = editableItem.qrCode;
      const downloadResumable = FileSystem.createDownloadResumable(
        uri,
        FileSystem.documentDirectory + "qrCode.png"
      );

      const { uri: localUri } = await downloadResumable.downloadAsync();
      await Sharing.shareAsync(localUri);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not download QR code.");
    }
  };

  const handleUpdate = async () => {
    if (item.qrCode) {
      flag = "treasure";
    }
    try {
      const formData = new FormData();
      const endpoint = `https://graffix-server.onrender.com/api/v1/${flag}/${item._id}`;
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      formData.append("title", editableItem.title);
      formData.append("description", editableItem.description);
      formData.append("category", editableItem.category);
      if (item.qrCode) {
        console.log(pinLocation.latitude, pinLocation.longitude);
        formData.append("message", editableItem.message);
        formData.append("latitude", pinLocation.latitude);
        formData.append("longitude", pinLocation.longitude);
      }

      if (editableItem.artwork && !location) {
        formData.append("artwork", {
          uri: editableItem.artwork,
          name: "artwork.jpg",
          type: "image/jpeg",
        });
      } else {
        formData.append("treasure", {
          uri: editableItem.artwork,
          name: "treasure.jpg",
          type: "image/jpeg",
        });
      }

      console.log("Form data:", formData);

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: headers,
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update");
      console.log("Response:", response);

      Alert.alert("Success", "Data updated successfully.");
      navigation.navigate("Artist");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not update data.");
    }
  };

  const handleDelete = async () => {
    if (item.qrCode) {
      flag = "treasure";
    }
    try {
      const response = await fetch(
        `https://graffix-server.onrender.com/api/v1/${flag}/${item._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete");

      Alert.alert("Success", "Data deleted successfully.");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not delete data.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      setNewImage(result.assets[0].uri);
      setEditableItem((prev) => ({ ...prev, artwork: result.assets[0].uri }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Pressable onPress={pickImage}>
          <Image source={{ uri: editableItem.artwork }} style={styles.image} />
        </Pressable>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Title</Text>
          <Pressable onPress={() => handleFieldEdit("title")}>
            <Feather name="edit" size={18} color="black" />
          </Pressable>
        </View>
        {isEditing.title ? (
          <TextInput
            style={styles.input}
            value={editableItem.title}
            onChangeText={(text) =>
              setEditableItem((prev) => ({ ...prev, title: text }))
            }
          />
        ) : (
          <Text style={styles.artName}>{editableItem.title}</Text>
        )}

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Description</Text>
          <Pressable onPress={() => handleFieldEdit("description")}>
            <Feather name="edit" size={18} color="black" />
          </Pressable>
        </View>
        {isEditing.description ? (
          <TextInput
            style={styles.input}
            value={editableItem.description}
            onChangeText={(text) =>
              setEditableItem((prev) => ({ ...prev, description: text }))
            }
          />
        ) : (
          <Text style={styles.description}>{editableItem.description}</Text>
        )}
        {location && (
          <>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Message</Text>
              <Pressable onPress={() => handleFieldEdit("message")}>
                <Feather name="edit" size={18} color="black" />
              </Pressable>
            </View>
            {isEditing.message ? (
              <TextInput
                style={styles.input}
                value={editableItem.message}
                onChangeText={(text) =>
                  setEditableItem((prev) => ({ ...prev, message: text }))
                }
              />
            ) : (
              <Text style={styles.message}>{item.message}</Text>
            )}
          </>
        )}

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Category</Text>
          <Pressable onPress={() => handleFieldEdit("category")}>
            <Feather name="edit" size={18} color="black" />
          </Pressable>
        </View>
        {isEditing.category ? (
          <Picker
            selectedValue={editableItem.category}
            onValueChange={(itemValue) =>
              setEditableItem((prev) => ({ ...prev, category: itemValue }))
            }
            style={styles.picker}
          >
            <Picker.Item label="Oil" value="oil" />
            <Picker.Item label="Abstract" value="abstract" />
            <Picker.Item label="Impressionism" value="impressionism" />
            <Picker.Item label="Surrealism" value="surrealism" />
            <Picker.Item label="Pop Art" value="pop art" />
            <Picker.Item label="Cubism" value="cubism" />
            <Picker.Item label="Expressionism" value="expressionism" />
          </Picker>
        ) : (
          <View style={styles.artTypeContainer}>
            <Text style={styles.artType}>{editableItem.category}</Text>
          </View>
        )}

        <View style={styles.locationWrapper}>
          {location && (
            <>
              <Text style={styles.label}>Location</Text>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onPress={(e) => setPinLocation(e.nativeEvent.coordinate)}
              >
                {pinLocation && <Marker coordinate={pinLocation} />}
              </MapView>
            </>
          )}
        </View>

        {editableItem.qrCode && (
          <View style={styles.qrCodeWrapper}>
            <Image
              source={{ uri: editableItem.qrCode }}
              style={styles.qrCodeImage}
            />
            <Pressable
              style={styles.downloadButton}
              onPress={handleDownloadQRCode}
            >
              <Feather name="download" size={24} color="black" />
            </Pressable>
          </View>
        )}

        <Pressable style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: "100%",
    height: 300,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  },
  imagePlaceholderText: {
    color: "#a0a0a0",
    fontSize: 18,
  },
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    color: "#7C7C7C",
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 8,
  },
  artName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 8,
    textTransform: "capitalize",
    lineHeight: 30,
  },
  message: {
    fontSize: 14,
    textAlign: "left",
    marginBottom: 16,
    marginLeft: 8,
  },
  artTypeContainer: {
    backgroundColor: "#202020",
    borderRadius: 24,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 8,
    marginLeft: 8,
  },
  artType: {
    fontSize: 14,
    color: "#FFF",
  },
  description: {
    fontSize: 14,
    textAlign: "left",
    marginBottom: 32,
    marginLeft: 8,
  },
  input: {
    borderColor: "#7C7C7C",
    borderWidth: 1,
    padding: 8,
    margin: 8,
    borderRadius: 8,
  },
  picker: {
    margin: 8,
    borderWidth: 1,
    borderColor: "#7C7C7C",
  },
  locationWrapper: {
    position: "relative",
    marginVertical: 20,
  },
  map: {
    width: "100%",
    height: 300,
    marginVertical: 20,
  },
  qrCodeWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    position: "relative",
  },
  qrCodeImage: {
    width: 200,
    height: 200,
  },
  downloadButton: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  updateButton: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    margin: 8,
  },
  updateButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    margin: 8,
    borderWidth: 1,
    borderColor: "#000",
  },
  deleteButtonText: {
    color: "#000",
    fontSize: 16,
  },
});
