import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import graffixAPI from "../../api/graffixAPI";
import { CarouselComponent } from "../../components/Home/CarouselComponent";
import { FlatListComponent } from "../../components/Home/FlatListComponent";

const image = require("../../../assets/backgroundImage.png");

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [galleryData, setGalleryData] = useState([]);
  const [nearbyData, setNearbyData] = useState([]);
  const [recentlyAddedData, setRecentlyAddedData] = useState([]);
  const [isLiked, setIsLiked] = useState([]);

  const fetchData = async () => {
    try {
      const artResponse = await graffixAPI.get(`/api/v1/art`);

      setGalleryData(artResponse.data.allArt.slice(0, 4));

      setRecentlyAddedData(artResponse.data.allArt.reverse().slice(0, 4));

      const nearbyResponse = await graffixAPI.get(
        `/api/v1/users/artists/nearby?longitude=-123.10763364103961&latitude=49.225084624107566&maxDistance=1000`
      );

      setNearbyData(nearbyResponse.data.slice(0, 4));

      const isLikedResponse = await graffixAPI.get(
        `/api/v1/users/current-user`
      );

      setIsLiked(isLikedResponse.data.userWithoutPassword.likedArtwork);

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
            <CarouselComponent galleryData={galleryData} />
          </View>
          {/* Section below the carousel */}
          <View style={styles.sectionsContainer}>
            {/* Categories Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Categories</Text>

              <FlatListComponent
                data={categoryOptions}
                type="Categories"
                refreshing={refreshing}
                handleRefresh={handleRefresh}
                navigation={navigation}
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
                      nearbyData,
                    })
                  }
                >
                  <Text>View All</Text>
                </Pressable>
              </View>

              <FlatListComponent
                data={nearbyData}
                type="Nearby"
                refreshing={refreshing}
                handleRefresh={handleRefresh}
                navigation={navigation}
              />
            </View>
            {/* Recently Added Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recently Added</Text>

              <FlatListComponent
                data={recentlyAddedData}
                type="Recently Added"
                refreshing={refreshing}
                handleRefresh={handleRefresh}
                isLiked={isLiked}
                navigation={navigation}
              />
            </View>
            {/* Art Venture Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ArtVenture</Text>
              <Pressable
                style={styles.artVentureBox}
                onPress={() => navigation.navigate("ArtVenture")}
              >
                <ImageBackground
                  source={image}
                  resizeMode="cover"
                  style={styles.backgroundImage}
                >
                  <Text style={[styles.sectionTitle, styles.artVentureTitle]}>
                    Probe into Art-filled Adventure
                  </Text>
                  <Text style={styles.artVentureText}>
                    Earn artworks and story behind
                  </Text>
                </ImageBackground>
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
    textTransform: "capitalize",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 30,
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
    flex: 1,
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
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  artVentureText: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
  },
  artVentureTitle: {
    color: "white",
    textAlign: "center",
  },
});
