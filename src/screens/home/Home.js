import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import graffixAPI from "../../api/graffixAPI";

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [galleryData, setGalleryData] = useState([]);
  const [nearbyData, setNearbyData] = useState([]);
  const [recentlyAddedData, setRecentlyAddedData] = useState([]);

  const fetchData = async () => {
    try {
      const artResponse = await graffixAPI.get(
        `https://graffix-server.onrender.com/api/v1/art`
      );

      setGalleryData(artResponse.data.allArt.slice(0, 4));
      setRecentlyAddedData(artResponse.data.allArt.reverse().slice(0, 4));

      const nearbyResponse = await graffixAPI.get(
        `https://graffix-server.onrender.com/api/v1/users/artists/nearby?longitude=-123.10763364103961&latitude=49.225084624107566&maxDistance=1000`
      );

      setNearbyData(nearbyResponse.data.slice(0, 4));

      //  setIsLoading(false);
      //  setError("");
    } catch (error) {
      console.log("Error fetching data: ", error);
      //  setIsLoading(false);
      //  setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categoryOptions = [
    {
      id: 1,
      image: "https://picsum.photos/id/55/4608/3072",
      category: "abstract",
    },
    {
      id: 2,
      image: "https://picsum.photos/id/58/1280/853",
      category: "oil",
    },
    {
      id: 3,
      image: "https://picsum.photos/id/57/2448/3264",
      category: "impressionism",
    },
    {
      id: 4,
      image: "https://picsum.photos/id/28/4928/3264",
      category: "surrealism",
    },
    {
      id: 5,
      image: "https://picsum.photos/id/27/3264/1836",
      category: "pop art",
    },
    {
      id: 6,
      image: "https://picsum.photos/id/41/1280/805",
      category: "cubism",
    },
    {
      id: 7,
      image: "https://picsum.photos/id/56/2880/1920",
      category: "expressionism",
    },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const width = Dimensions.get("window").width;

  return (
    galleryData && (
      <SafeAreaView style={styles.container}>
        <ScrollView bounces={false}>
          <View style={{ flex: 1 }}>
            <Carousel
              loop
              width={width}
              height={width}
              autoPlay={true}
              data={galleryData}
              scrollAnimationDuration={3000}
              renderItem={({ index }) => (
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <View style={styles.container}>
                    <Image
                      style={styles.image}
                      source={galleryData[index].artworkUrl}
                      contentFit="cover"
                      transition={1000}
                    />
                  </View>
                  <View style={styles.artDescription}>
                    <Text style={styles.white}>Art of the Day</Text>
                    <Text style={[styles.artworkName, styles.white]}>
                      {galleryData[index].title.toUpperCase()}
                    </Text>
                    <Text style={styles.white}>
                      {galleryData[index].category.toUpperCase()}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
          {/* Section below the carousel */}
          <View style={styles.sectionsContainer}>
            {/* Categories Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <FlatList
                horizontal
                bounces={false}
                data={categoryOptions}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      style={styles.card}
                      onPress={() =>
                        navigation.navigate("Categories", {
                          category: item.category,
                        })
                      }
                    >
                      <Image
                        style={[styles.image, styles.cardImage]}
                        source={item.image}
                        contentFit="cover"
                        transition={1000}
                      />
                      <Text
                        style={{
                          textTransform: "capitalize",
                          fontWeight: "bold",
                        }}
                      >
                        {item.category}
                      </Text>
                    </Pressable>
                  );
                }}
                ItemSeparatorComponent={<View style={{ width: 16 }} />}
                ListEmptyComponent={
                  <Text style={styles.trendingCardTitle}>Nothing to show</Text>
                }
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            </View>
            {/* Nearby Section */}
            <View style={styles.section}>
              <View style={styles.flexSection}>
                <Text style={styles.sectionTitle}>Nearby</Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Nearby", {
                      message: "This will show the Nearby Data",
                    })
                  }
                >
                  <Text>View All</Text>
                </Pressable>
              </View>
              <FlatList
                horizontal
                bounces={false}
                data={nearbyData}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      style={styles.card}
                      onPress={() =>
                        navigation.navigate("Nearby", {
                          message: "This will show the Nearby Data",
                        })
                      }
                    >
                      <Image
                        style={[styles.image, styles.cardImage]}
                        source={item.avatar}
                        contentFit="cover"
                        transition={1000}
                      />
                      <Text
                        style={{
                          textTransform: "capitalize",
                          fontWeight: "bold",
                        }}
                      >
                        {item.username}
                      </Text>
                      <Text>
                        <Ionicons name="location" style={{ padding: 10 }} />
                        200 m
                      </Text>
                    </Pressable>
                  );
                }}
                ItemSeparatorComponent={<View style={{ width: 16 }} />}
                ListEmptyComponent={
                  <Text style={styles.trendingCardTitle}>Nothing to show</Text>
                }
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            </View>
            {/* Recently Added Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recently Added</Text>
              <FlatList
                horizontal
                bounces={false}
                data={recentlyAddedData}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      style={styles.card}
                      onPress={() =>
                        alert(`Goes to a screen with the item details`)
                      }
                    >
                      <Image
                        style={[styles.image, styles.cardImage]}
                        source={item.artworkUrl}
                        contentFit="cover"
                        transition={1000}
                      />
                      <View style={styles.flexSection}>
                        <View>
                          <Text
                            style={{
                              textTransform: "capitalize",
                              fontWeight: "bold",
                            }}
                          >
                            {item.title.toUpperCase()}
                          </Text>
                          <Text>{item.category.toUpperCase()}</Text>
                        </View>
                        <Ionicons
                          name="heart-outline"
                          style={{ padding: 10 }}
                        />
                      </View>
                    </Pressable>
                  );
                }}
                ItemSeparatorComponent={<View style={{ width: 16 }} />}
                ListEmptyComponent={
                  <Text style={styles.trendingCardTitle}>Nothing to show</Text>
                }
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            </View>
            {/* Art Venture Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ArtVenture</Text>
              <Pressable
                style={styles.artVentureBox}
                onPress={() => alert("I will go to this screen")}
              >
                <Text style={styles.sectionTitle}>Play the Hunt Game!</Text>
                <Text>Get exciting stories and more!</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
  artDescription: {
    marginTop: -100,
    paddingHorizontal: 16,
  },
  white: {
    color: "white",
  },
  artworkName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  flexSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionsContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  card: {
    width: 200,
    height: 200,
  },
  section: {
    paddingVertical: 16,
  },
  cardImage: {
    borderRadius: 5,
  },
  artVentureBox: {
    flex: 1,
    gap: 10,
    borderWidth: 1,
    borderRadius: 5,
    height: 200,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "lightgray",
  },
});
