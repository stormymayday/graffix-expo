import React, { useEffect, useState, useContext, useRef } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import graffixAPI from "../../api/graffixAPI";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserDataContext from "../../context/UserDataContext";
import * as Location from "expo-location";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

export default function ArtWorkEdit({ route, navigation }) {
  const { item } = route.params;
  const [otherArtworks, setOtherArtworks] = useState([]);
  const [author, setAuthor] = useState({});
  const { userData, updateUser } = useContext(UserDataContext);
  const [isLiked, setIsLiked] = useState(
    userData.likedArtwork.includes(item._id)
  );
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [category, setCategory] = useState(item.category);
  const [location, setLocation] = useState(null);
  const [pinLocation, setPinLocation] = useState({
    latitude: item.location.coordinates[1],
    longitude: item.location.coordinates[0],
  });
  const [qrCodeValue, setQrCodeValue] = useState(item._id);
  const viewShotRef = useRef(null);

  useEffect(() => {
    const title = item.title;
    navigation.setOptions({ title });

    const fetchOtherArtworks = async () => {
      try {
        const response = await graffixAPI.get(
          `/api/v1/art/artist/${item.createdBy}`
        );
        const filteredArtworks = response.data.filter(
          (artwork) => artwork._id !== item._id
        );
        setOtherArtworks(filteredArtworks);
      } catch (error) {
        console.error("Error fetching other artworks: ", error);
      }
    };

    fetchOtherArtworks();
  }, [navigation, item]);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await graffixAPI.get(`/api/v1/users/${userId}`);
        setAuthor(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData(item.createdBy);
  }, [item.createdBy]);

  useEffect(() => {
    setIsLiked(userData.likedArtwork.includes(item._id));
  }, [item, userData.likedArtwork]);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.error("Error fetching location: ", error);
      }
    })();
  }, []);

  const handleLikePress = async () => {
    try {
      if (isLiked) {
        const response = await graffixAPI.patch(
          `/api/v1/users/unlike-artwork/${item._id}`
        );
        if (response.status === 200) {
          setIsLiked(false);
          updateUser({
            likedArtwork: userData.likedArtwork.filter(
              (_id) => _id !== item._id
            ),
          });
        }
      } else {
        const response = await graffixAPI.patch(
          `/api/v1/users/like-artwork/${item._id}`
        );
        if (response.status === 200) {
          setIsLiked(true);
          updateUser({
            likedArtwork: [...userData.likedArtwork, item._id],
          });
        }
      }
    } catch (error) {
      console.error("Error liking/unliking artwork: ", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await graffixAPI.patch(`/api/v1/art/${item._id}`, {
        title,
        description,
        category,
        location: {
          type: "Point",
          coordinates: [pinLocation.longitude, pinLocation.latitude],
        },
      });

      if (response.status === 200) {
        Alert.alert("Artwork updated successfully");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error updating artwork: ", error);
      Alert.alert("Failed to update artwork", error.message);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const captureQRCode = async () => {
    if (viewShotRef.current) {
      const uri = await viewShotRef.current.capture();
      await saveQRCodeToGallery(uri);
    }
  };

  const saveQRCodeToGallery = async (uri) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync("Download", asset, false);
        Alert.alert("QR code saved to gallery successfully");
      } else {
        Alert.alert("Permission to access gallery is required");
      }
    } catch (error) {
      Alert.alert("Failed to save QR code", error.message);
    }
  };

  const renderHeader = () => (
    <>
      <Image source={{ uri: item.artworkUrl }} style={styles.image} />
      <View style={styles.titleContainer}>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
        <TouchableOpacity onPress={handleLikePress}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? "red" : "gray"}
            style={styles.likeIcon}
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.mapContainer}>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: pinLocation.latitude,
              longitude: pinLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={(e) => setPinLocation(e.nativeEvent.coordinate)}
          >
            <Marker coordinate={pinLocation} />
          </MapView>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.qrCodeContainer}>
        <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1.0 }}>
          <QRCode value={qrCodeValue} size={200} />
        </ViewShot>
        <TouchableOpacity style={styles.downloadButton} onPress={captureQRCode}>
          <Text style={styles.downloadButtonText}>Download</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>More from the artist</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={otherArtworks}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.otherArtwork}
            onPress={() => navigation.navigate("ArtDetail", { item })}
          >
            <Image
              source={{ uri: item.artworkUrl }}
              style={styles.otherArtworkImage}
            />
            <Text style={styles.otherArtworkTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={renderHeader}
      />
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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
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
  likeIcon: {
    padding: 10,
  },
  author: {
    fontSize: 18,
    color: "gray",
    marginBottom: 8,
  },
  artType: {
    fontSize: 18,
    color: "gray",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  artistContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  artistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  artistName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  visitProfileButton: {
    marginTop: 4,
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
  visitProfileButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  otherArtwork: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    padding: 8,
  },
  otherArtworkImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 4,
  },
  otherArtworkTitle: {
    fontSize: 14,
    textAlign: "center",
  },
  mapContainer: {
    width: "100%",
    height: 300,
    marginVertical: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    padding: 15,
    width: "48%",
    borderRadius: 10,
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#000",
    padding: 15,
    width: "48%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
  },
  qrCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  downloadButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
