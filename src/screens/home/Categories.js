import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
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
    <SafeAreaView style={styles.container}>
      <Text>Categories Screen</Text>
      <Text>{route.params.category}</Text>
      {categoriesData.length > 0 && (
        <FlatList
          bounces={false}
          numColumns={numColumns}
          data={categoriesData}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={styles.card}
                onPress={() => alert(`Goes to a screen with the item details`)}
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
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
