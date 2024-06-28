import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import graffixAPI from "../../api/graffixAPI";

const ArtistDetailScreen = ({ route, navigation }) => {
  const { artist } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: artist.username });
    fetchArtWorks(artist._id);
  }, [navigation, artist]);

  const [user, setUser] = useState(null);
  const [artWorks, setArtWorks] = useState([]);

  useEffect(() => {
    setUser({
      name: artist.username,
      avatar: artist.avatar,
      address: artist.address,
      description: artist.bio,
    });
  }, [artist]);

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

  const renderItem = ({ item}) => (
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
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Text style={styles.name}>{user.name}</Text>
          </View>
          <Text style={styles.address}>{user.address}</Text>
          <Text style={styles.description}>{user.description}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => console.log("Contact pressed")}
      >
        <Text style={styles.contactText}>Contact</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 16,
        }}
      >
        <TouchableOpacity onPress={() => console.log("Navigate to ArtWork")}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>ArtWork</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Navigate to ArtVenture")}>
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
    </SafeAreaView>
  );
};

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
  contactButton: {
    alignSelf: "center",
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#BEBEBE",
    borderRadius: 8,
  },
  contactText: {
    color: "#000000",
    fontSize: 16,
  },
});

export default ArtistDetailScreen;
