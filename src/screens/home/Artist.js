import React, { useState, useEffect, useContext } from "react";
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
import graffixAPI from "../../api/graffixAPI";
import UserDataContext from "../../context/UserDataContext";

export default function Artist({ navigation, route }) {
  const { userData, updateUser } = useContext(UserDataContext);
  const [artWorks, setArtWorks] = useState([]);

  React.useEffect(() => {
    if (!userData) return;

    const fetchArtWorks = async (userId) => {
      try {
        const response = await graffixAPI.get(`/api/v1/art/artist/${userId}`);
        const artWorkData = response.data;
        setArtWorks(
          artWorkData.map((artwork) => ({
            id: artwork._id,
            artName: artwork.title,
            description: artwork.description,
            category: artwork.category,
            imageUrl: artwork.artworkUrl,
            author: artwork.artistName,
          }))
        );
      } catch (error) {
        console.error("Error fetching artworks data:", error);
      }
    };

    fetchArtWorks(userData._id);
  }, [userData]);


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.artContainer}
      onPress={() => navigation.navigate("ArtDetailFromProfile", { item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.artImage} />
    </TouchableOpacity>
  );

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
        <TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>ArtWork</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontSize: 16, color: "gray" }}>ArtVenture</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={artWorks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
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
});
