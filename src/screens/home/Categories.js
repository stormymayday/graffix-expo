import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import { useState, useEffect, useCallback, useRef } from "react";
import graffixAPI from "../../api/graffixAPI";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { Favorite, OutlineHeart } from "../../components/Icons/Icons";
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";

export default function Categories({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoriesData, setCategoriesData] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isLiked, setIsLiked] = useState([]);

  const isMounted = useRef(true);

  const fetchData = useCallback(async (showLoading = false) => {
    if (showLoading) setIsLoading(true);

    setError("");

    try {
      const artResponse = await graffixAPI.get(
        `https://graffix-server.onrender.com/api/v1/art/category/${route.params.category}`
      );

      // Fetch user data (for liked artworks)
      const isLikedResponse = await graffixAPI.get(
        `/api/v1/users/current-user`
      );

      // Update state if the component is still mounted
      if (isMounted.current) {
        setCategoriesData(artResponse.data);

        setIsLiked(isLikedResponse.data.userWithoutPassword.likedArtwork);
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
      setError("Failed to fetch data");
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      isMounted.current = true;
      if (isLoading) {
        fetchData(true);
      } else {
        fetchData(false);
      }
      // Cleanup function
      return () => {
        isMounted.current = false;
      };
    }, [fetchData, isLoading])
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(false).then(() => setRefreshing(false));
  }, [fetchData]);

  // Showing loading indicator for the initial load
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  // Showing error message if there's an error and no data
  if (error && !categoriesData.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{error}</Text>
        <Pressable onPress={() => fetchData(true)}>
          <Text>Retry</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const numColumns = 2;

  return (
    categoriesData.length > 0 && (
      <SafeAreaView style={styles.container}>
        <ScrollView bounces={false} style={{ minWidth: "95%" }}>
          <Pressable
            onPress={() =>
              navigation.navigate("ArtDetail", { item: categoriesData[0] })
            }
            style={{
              flex: 1,
              marginBottom: 50,
              width: "100%",
            }}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.featuredImage}
                source={categoriesData[0].artworkUrl}
                contentFit="fill"
                transition={1000}
              />
            </View>
            <View style={styles.artDescription}>
              <Text style={styles.white}>{categoriesData[0].artistName}</Text>
              <Text style={[styles.artworkName, styles.white]}>
                {categoriesData[0].title}
              </Text>
            </View>
          </Pressable>

          <View>
            <FlatList
              // style={{ minHeight: 1000 }}
              bounces={false}
              numColumns={numColumns}
              data={categoriesData.slice(1)}
              contentContainerStyle={styles.center}
              renderItem={({ item }) => {
                return (
                  <View style={{ width: '50%' }}>
                    <Pressable
                      style={styles.card}
                      onPress={() => navigation.navigate("ArtDetail", { item })}
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
                            {item.title}
                          </Text>
                          <Text>{item.artistName}</Text>
                        </View>
                        {/* <Ionicons
                        name={
                          isLiked.includes(item._id) ? "heart" : "heart-outline"
                        }
                      /> */}
                        {isLiked.includes(item._id) ? (
                          <Favorite size={16} color={"black"} />
                        ) : (
                          <OutlineHeart size={16} />
                        )}
                      </View>
                    </Pressable>
                  </View>
                );
              }}
              ItemSeparatorComponent={<View style={{ width: 16 }} />}
              ListEmptyComponent={
                <Text style={styles.trendingCardTitle}>Nothing to show</Text>
              }
              refreshing={refreshing}
              onRefresh={handleRefresh}
              scrollEnabled={false}
            />
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
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
  featuredImage: {
    flex: 1,
    width: "100%",
    height: 300,
    backgroundColor: "#0553",
  },
  artDescription: {
    marginTop: -80,
    paddingHorizontal: 16,
  },
  white: {
    color: "white",
  },
  artworkName: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
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
    width: "100%",
    height: 200,
    padding: 10
  },
  section: {
    paddingVertical: 16,
  },
  cardImage: {
    borderRadius: 8,
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
  }
});
