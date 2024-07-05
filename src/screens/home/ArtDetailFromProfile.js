import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import graffixAPI from "../../api/graffixAPI";

export default function ArtDetail({ route, navigation }) {
  const { item } = route.params;
  console.log(item);
  const [otherArtworks, setOtherArtworks] = useState([]);

  useEffect(() => {
    const title = item.artName;
    navigation.setOptions({ title });

    const fetchOtherArtworks = async () => {
      try {
        const response = await graffixAPI.get(
          `/api/v1/art/artist/${item.authorId}`
        );
        setOtherArtworks(response.data);
      } catch (error) {
        console.error("Error fetching other artworks: ", error);
      }
    };

    fetchOtherArtworks();
  }, [navigation, item.artName, item.title, item.userId]);

  const renderHeader = () => (
    <>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.artName}>{item.artName}</Text>
      <Text style={styles.author}>By: {item.author}</Text>
      <Text style={styles.artType}>{item.category}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.artistContainer}>
        <Image source={{ uri: "/" }} style={styles.artistImage} />
        <View>
          <Text style={styles.artistName}>{item.author}</Text>
          <TouchableOpacity style={styles.visitProfileButton}>
            <Text style={styles.visitProfileButtonText}>Visit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>More from the artist</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={otherArtworks}
        renderItem={({ item }) => (
          <View style={styles.otherArtwork}>
            <Image
              source={{ uri: item.artworkUrl }}
              style={styles.otherArtworkImage}
            />
            <Text style={styles.otherArtworkTitle}>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
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
  artName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "capitalize",
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
});


