import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import graffixAPI from "../../api/graffixAPI";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Categories({ navigation, route }) {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoriesData, setCategoriesData] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const artResponse = await graffixAPI.get(
        `https://graffix-server.onrender.com/api/v1/art/category/${route.params.category}`
      );

      console.log(artResponse.data);

      setCategoriesData(artResponse.data);

      //  setIsLoading(false);
      //  setError("");
    } catch (error) {
      console.log("Error fetching data: ", error);
      //  setIsLoading(false);
      //  setError("Failed to fetch Data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const numColumns = 2;

  return (
    categoriesData.length > 0 && (
      <SafeAreaView style={styles.container}>
        <ScrollView bounces={false} style={{ minWidth: "95%" }}>
          <View
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
          </View>

          <View>
            <FlatList
              // style={{ minHeight: 1000 }}
              bounces={false}
              numColumns={numColumns}
              data={categoriesData.slice(1)}
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
                        <Text>{item.artistName}</Text>
                      </View>
                      <Ionicons name="heart-outline" style={{ padding: 10 }} />
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
    width: 160,
    height: 160,
    margin: 3,
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
