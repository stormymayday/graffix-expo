import React, { useState, useEffect } from "react";
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

export default function Collector({ navigation, route }) {
  const [user, setUser] = useState(null);
  // const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await graffixAPI.get("/api/v1/users/current-user");
        const userData = response.data.userWithoutPassword;
        console.log("User data:", userData);
        setUser({
          name: userData.username,
          avatar: userData.avatar,
          address: userData.address,
          description: userData.bio,
        });
        // setFavorites(userData.likes);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      fetchUserData();
    });

    return unsubscribe;
  }, [navigation]);

  // Dummy data for favorites
  const favorites = [
    {
      id: "1",
      imageUrl: "https://picsum.photos/id/55/4608/3072",
      artType: "Painting",
      artName: "Sunset Overdrive",
      description: "A beautiful sunset over the hills.",
      author: "John Doe",
    },
    {
      id: "2",
      imageUrl: "https://picsum.photos/id/58/1280/853",
      artType: "Sculpture",
      artName: "The Thinker",
      description: "A thought-provoking sculpture.",
      author: "Jane Doe",
    },
    {
      id: "3",
      imageUrl: "https://picsum.photos/id/57/2448/3264",
      artType: "Drawing",
      artName: "Nature Sketch",
      description: "A sketch of the wilderness.",
      author: "John Smith",
    },
    {
      id: "4",
      imageUrl: "https://picsum.photos/id/72/2448/3064",
      artType: "Digital Art",
      artName: "Cyberpunk City",
      description: "A digital art of a futuristic city.",
      author: "Anna Smith",
    },
    {
      id: "5",
      imageUrl: "https://picsum.photos/id/826/200/300",
      artType: "Photography",
      artName: "Mountain View",
      description: "A stunning photograph of mountain scenery.",
      author: "Mark Johnson",
    },
    {
      id: "6",
      imageUrl: "https://picsum.photos/id/1061/200/300",
      artType: "Mixed Media",
      artName: "Abstract Thoughts",
      description: "A mixed media artwork with abstract elements.",
      author: "Laura Brown",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.artContainer}
      onPress={() => navigation.navigate("ArtDetail", { item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.artImage} />
    </TouchableOpacity>
  );

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Pressable onPress={() => navigation.navigate("EditProfile", { user })}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        </Pressable>

        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.navigate("EditProfile", { user })}
            >
              <Text style={styles.name}>{user.name}</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("EditProfile", { user })}
            >
              <Feather name="edit" size={18} color="black" />
            </Pressable>
          </View>
          <Text style={styles.address}>{user.address}</Text>
          <Text style={styles.description}>{user.description}</Text>
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
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontSize: 16, color: "gray" }}>Collection</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
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
});
