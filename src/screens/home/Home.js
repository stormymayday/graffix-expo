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
import { useState } from "react";

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const dummyData = [
    {
      id: 1,
      artworkName: "Water and Plants",
      image: "https://picsum.photos/id/55/4608/3072",
      artistName: "James Jackson",
      category: "abstract",
      location: "0.31",
    },
    {
      id: 2,
      artworkName: "Gray Tower",
      image: "https://picsum.photos/id/58/1280/853",
      artistName: "Kelly Jenkins",
      category: "oil",
      location: "0.35",
    },
    {
      id: 3,
      artworkName: "Lonely City",
      image: "https://picsum.photos/id/57/2448/3264",
      artistName: "Gregory Smith",
      category: "impressionism",
      location: "0.5",
    },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    // fetchData();
    setRefreshing(false);
  };

  const width = Dimensions.get("window").width;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Carousel
            loop
            width={width}
            height={width}
            autoPlay={true}
            data={dummyData}
            scrollAnimationDuration={5000}
            renderItem={({ index }) => (
              <View
                style={{
                  flex: 1,
                }}
              >
                <View style={styles.container}>
                  <Image
                    style={styles.image}
                    source={dummyData[index].image}
                    contentFit="cover"
                    transition={1000}
                  />
                </View>
                <View style={styles.artDescription}>
                  <Text style={styles.white}>Art of the Day</Text>
                  <Text style={[styles.artworkName, styles.white]}>
                    {dummyData[index].artworkName}
                  </Text>
                  <Text style={styles.white}>
                    {dummyData[index].artistName}
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
              data={dummyData}
              renderItem={({ item }) => {
                return (
                  <Pressable
                    style={styles.card}
                    onPress={() =>
                      navigation.navigate("Categories", {
                        message: "This will show the Categories Data",
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
              data={dummyData}
              renderItem={({ item }) => {
                return (
                  <Pressable
                    style={styles.card}
                    onPress={() =>
                      navigation.navigate("Categories", {
                        message: "This will show the Nearby Data",
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
                      {item.artistName}
                    </Text>
                    <Text>
                      <Ionicons name="location" style={{ padding: 10 }} />
                      {item.location} mi
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
              data={dummyData}
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
                      source={item.image}
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
                          {item.artworkName}
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
