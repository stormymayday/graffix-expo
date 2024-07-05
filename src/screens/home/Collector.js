import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import UserDataContext from "../../context/UserDataContext";
import graffixAPI from "../../api/graffixAPI";

export default function Collector({ navigation, route }) {
  const { userData, updateUser } = useContext(UserDataContext);
  const [likedArtwork, setLikedArtwork] = useState([]);
  const [collectedTreasures, setCollectedTreasures] = useState([]);
  const [selectedTab, setSelectedTab] = useState("favourite");

  useEffect(() => {
    if (!userData) return;

    const fetchlikedArtWorks = async (userId) => {
      try {
        const response = await graffixAPI.get(
          `/api/v1/users/${userId}/liked-artworks`
        );
        const likedArtWorkData = response.data.likedArtworks;
        setLikedArtwork(
          likedArtWorkData.map((likedArtWork) => ({
            id: likedArtWork._id,
            artName: likedArtWork.title,
            description: likedArtWork.description,
            category: likedArtWork.category,
            imageUrl: likedArtWork.artworkUrl,
            author: likedArtWork.artistName,
            authorId: likedArtWork.createdBy,
            likes: likedArtWork.likes,
          }))
        );
      } catch (error) {
        console.error("Error fetching artworks data:", error);
      }
    };

    fetchlikedArtWorks(userData._id);
  }, [userData]);

  useEffect(() => {
    if (!userData) return;

    const fetchCollectedTreasures = async (userId) => {
      try {
        const response = await graffixAPI.get(
          `/api/v1/users/${userId}/collected-treasures`
        );
        const collectedTreasureData = response.data;
        setCollectedTreasures(
          collectedTreasureData.map((collectedTreasure) => ({
            id: collectedTreasure._id,
            artName: collectedTreasure.title,
            description: collectedTreasure.description,
            category: collectedTreasure.category,
            imageUrl: collectedTreasure.treasureUrl,
            author: collectedTreasure.artistName,
            authorId: collectedTreasure.createdBy,
            likes: collectedTreasure.likes,
            qrcode: collectedTreasure.qrCodeurl,
            message: collectedTreasure.message,
          }))
        );
      } catch (error) {
        console.error("Error fetching artworks data:", error);
      }
    };

    fetchCollectedTreasures(userData._id);
  }, [userData]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.artContainer}
      onPress={() => navigation.navigate("ArtDetailFromProfile", { item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.artImage} />
    </TouchableOpacity>
  );

  const getData = () => {
    return selectedTab === "favourite" ? likedArtwork : collectedTreasures;
  };

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Pressable onPress={() => navigation.navigate("EditProfile")}>
          <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        </Pressable>

        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.navigate("EditProfile")}>
              <Text style={styles.name}>{userData.username}</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("EditProfile")}>
              <Feather name="edit" size={18} color="black" />
            </Pressable>
          </View>
          <Text style={styles.address}>
            {userData.location ? userData.location.coordinates.join(",") : ""}
          </Text>
          <Text style={styles.description}>{userData.bio}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 16,
        }}
      >
        <TouchableOpacity onPress={() => setSelectedTab("favourite")}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: selectedTab === "favourite" ? "bold" : "normal",
            }}
          >
            Favourite
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab("collection")}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: selectedTab === "collection" ? "bold" : "normal",
            }}
          >
            Collection
          </Text>
        </TouchableOpacity>
      </View>

      {getData().length > 0 ? (
        <FlatList
          data={getData()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {selectedTab === "favourite"
              ? "You haven't liked any artwork yet."
              : "You haven't collected any treasures yet."}
          </Text>
        </View>
      )}
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
  address: {
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
});
