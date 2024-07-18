import React, { useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import graffixAPI from "../../api/graffixAPI";
import UserDataContext from "../../context/UserDataContext";
import { Image } from "expo-image";

export default function Artist({ navigation, route }) {
  const { userData, updateUser } = useContext(UserDataContext);
  const [artWorks, setArtWorks] = useState([]);
  const [treasures, setTreasures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ArtWork");
  const defaultAvatar = require("../../../assets/Profile/defaultAvatar.png");
  const image = require("../../../assets/Profile/Union.svg");

  const fetchUserData = useCallback(async (userId) => {
    if (!userId) return;

    setIsLoading(true);

    try {
      // Fetching artworks
      const artResponse = await graffixAPI.get(`/api/v1/art/artist/${userId}`);
      const artWorkData = artResponse.data;

      setArtWorks(
        artWorkData.map((artwork) => ({
          _id: artwork._id,
          title: artwork.title,
          description: artwork.description,
          category: artwork.category,
          imageUrl: artwork.artworkUrl,
          artistName: artwork.artistName,
          createdBy: artwork.createdBy,
        }))
      );

      // Fetching treasures
      const treasureResponse = await graffixAPI.get(
        `/api/v1/treasure/artist/${userId}`
      );
      const treasureData = treasureResponse.data;
      setTreasures(
        treasureData.map((treasure) => ({
          _id: treasure._id,
          title: treasure.title,
          description: treasure.description,
          category: treasure.category,
          imageUrl: treasure.treasureUrl,
          createdBy: treasure.createdBy,
          qrCode: treasure.qrCodeUrl,
          location: treasure.location,
          message: treasure.message,
        }))
      );
      console.log("Fetched treasures:", treasures);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (userData) {
        fetchUserData(userData._id);
      }
    }, [userData, fetchUserData])
  );

  const renderArtworkItem = ({ item }) => (
    <TouchableOpacity
      style={styles.artContainer}
      onPress={() => navigation.navigate("ArtDetailFromProfile", { item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.artImage} />
    </TouchableOpacity>
  );

  const renderTreasureItem = ({ item }) => (
    <TouchableOpacity
      style={styles.treasureContainer}
      onPress={() => navigation.navigate("ArtDetailFromProfile", { item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.treasureImage} />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Pressable onPress={() => navigation.navigate("EditArtistProfile")}>
          <Image
            source={userData.avatar ? { uri: userData.avatar } : defaultAvatar}
            style={styles.avatar}
          />
        </Pressable>

        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.navigate("EditArtistProfile")}>
              <Text style={styles.name}>{userData.username}</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("EditArtistProfile")}>
              <Feather name="edit" size={18} color="black" />
            </Pressable>
          </View>
          <Text style={styles.pronouns}>
            {userData.pronouns ? userData.pronouns : ""}
          </Text>
          <Text style={styles.description}>{userData.bio}</Text>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab("ArtWork")}>
          <Text
            style={
              activeTab === "ArtWork"
                ? styles.activeTabText
                : styles.inactiveTabText
            }
          >
            ArtWork
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("ArtVenture")}>
          <Text
            style={
              activeTab === "ArtVenture"
                ? styles.activeTabText
                : styles.inactiveTabText
            }
          >
            ArtVenture
          </Text>
        </TouchableOpacity>
      </View>

      {artWorks.length === 0 && activeTab === "ArtWork" && (
        <View style={styles.placeholderContainer}>
          <Image style={styles.placeholderImage} source={image} />
          <Text style={styles.placeholderText}>
            Sorry, no artwork yet. Let's upload your artwork!
          </Text>
        </View>
      )}
      {treasures.length === 0 && activeTab === "ArtVenture" && (
        <View style={styles.placeholderContainer}>
          <Image style={styles.placeholderImage} source={image} />
          <Text style={styles.placeholderText}>
            Sorry, no artVenture yet. Let's create your artVenture!
          </Text>
        </View>
      )}

      {artWorks.length > 0 ||
        (treasures.length > 0 && (
          <FlatList
            data={activeTab === "ArtWork" ? artWorks : treasures}
            renderItem={
              activeTab === "ArtWork" ? renderArtworkItem : renderTreasureItem
            }
            keyExtractor={(item) => item._id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        ))}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("SelectAndUpload")}
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pronouns: {
    color: "gray",
    marginBottom: 4,
  },
  description: {
    color: "gray",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  artContainer: {
    width: "48%",
    backgroundColor: "white",
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    padding: 8,
  },
  artImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 10,
    backgroundColor: "#202020",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  inactiveTabText: {
    fontSize: 16,
    color: "gray",
  },
  treasureContainer: {
    width: "48%",
    backgroundColor: "white",
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    padding: 8,
  },
  treasureImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
  },
  treasureTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  placeholderImage: {
    width: 107.473,
    height: 107.473,
    resizeMode: "contain",
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#9B9B9B",
    marginTop: 8,
  },
});
