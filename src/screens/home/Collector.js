import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

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
    imageUrl: "https://via.placeholder.com/150",
    artType: "Photography",
    artName: "Mountain View",
    description: "A stunning photograph of mountain scenery.",
    author: "Mark Johnson",
  },
  {
    id: "6",
    imageUrl: "https://via.placeholder.com/150",
    artType: "Mixed Media",
    artName: "Abstract Thoughts",
    description: "A mixed media artwork with abstract elements.",
    author: "Laura Brown",
  },
];

export default function Collector({ navigation, route }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.artContainer}
      onPress={() => navigation.navigate("ArtDetail", { item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.artImage} />
    </TouchableOpacity>
  );

  const [user, setUser] = useState({
    name: "Ferando Buritto",
    imageUrl: "https://via.placeholder.com/100",
    address: "154, W 49th Ave, Vancouver",
    description:
      "Eccentric painter with a knack for nature. I enjoy hiking and nature walks.",
  });

  useEffect(() => {
    if (route.params?.updatedUser) {
      setUser(route.params.updatedUser);
    }
  }, [route.params?.updatedUser]);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Pressable onPress={() => navigation.navigate("EditProfile", { user })}>
          <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
        </Pressable>

        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.navigate("EditProfile", { user })}
            >
              <Text style={styles.name}>{user.name}</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Settings")}>
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
