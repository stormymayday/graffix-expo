import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    ScrollView,
    Pressable,
    ImageBackground,
    RefreshControl,
    ActivityIndicator,
} from "react-native";

import { useState, useCallback, useRef, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Context as AuthContext } from "../../context/AuthContext";

import graffixAPI from "../../api/graffixAPI";
import { CarouselComponent } from "../../components/Home/CarouselComponent";
import { FlatListComponent } from "../../components/Home/FlatListComponent";
import { ChevronForward } from "../../components/Icons/Icons";

const image = require("../../../assets/backgroundImage.png");

export default function Home({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);

    const { state: authState } = useContext(AuthContext);
    const [isLocationLoading, setIsLocationLoading] = useState(true);

    // State variable to show a loading indicator only on the first load.
    // Tracks if it's the first load
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    const [error, setError] = useState("");
    const [galleryData, setGalleryData] = useState([]);
    const [nearbyData, setNearbyData] = useState([]);
    const [recentlyAddedData, setRecentlyAddedData] = useState([]);
    const [isLiked, setIsLiked] = useState([]);

    // using a useRef hook (isMounted) to prevent state updates if the component unmounts during an async operation.
    const isMounted = useRef(true);

    // Function to fetch data from the API
    // The fetchData function is wrapped in useCallback for optimization.
    const fetchData = useCallback(
        async (showLoading = false) => {
            if (showLoading) setIsInitialLoading(true);

            setError("");

            try {
                // Fetching all artworks
                const artResponse = await graffixAPI.get(`/api/v1/art`);

                // Fetch nearby artists (Needs to be dynamic)
                // const nearbyResponse = await graffixAPI.get(
                //     `/api/v1/users/artists/nearby?longitude=-123.10763364103961&latitude=49.225084624107566&maxDistance=1000`
                // );
                // Fetch nearby artists using location from authState
                if (authState.currentLocation) {
                    const nearbyResponse = await graffixAPI.get(
                        `/api/v1/users/artists/nearby`,
                        {
                            params: {
                                longitude: authState.currentLocation.longitude,
                                latitude: authState.currentLocation.latitude,
                                maxDistance: 1000,
                            },
                        }
                    );

                    // setNearbyData(nearbyResponse.data.slice(0, 4));
                    setNearbyData(nearbyResponse.data);
                    setIsLocationLoading(false);
                }

                // Fetch user data (for liked artworks)
                const isLikedResponse = await graffixAPI.get(
                    `/api/v1/users/current-user`
                );

                // Update state if the component is still mounted
                if (isMounted.current) {
                    //   setGalleryData(artResponse.data.allArt.slice(0, 4));
                    const allArt = artResponse.data.allArt;
                    const lastTenItems = allArt.slice(-18);
                    const shuffledLastTen = lastTenItems.sort(
                        () => 0.5 - Math.random()
                    );
                    const selectedFourItems = shuffledLastTen.slice(0, 4);

                    setGalleryData(selectedFourItems);

                    setRecentlyAddedData(
                        artResponse.data.allArt.reverse().slice(0, 4)
                    );

                    // Causes error
                    // setNearbyData(nearbyResponse.data.slice(0, 4));

                    setIsLiked(
                        isLikedResponse.data.userWithoutPassword.likedArtwork
                    );
                }
            } catch (error) {
                console.log("Error fetching data: ", error);
                setError("Failed to fetch data");
            } finally {
                if (isMounted.current) {
                    setIsInitialLoading(false);
                }
            }
        },
        [authState.currentLocation]
    );

    // Using useFocusEffect to fetch data when the screen comes into focus.
    useFocusEffect(
        useCallback(() => {
            isMounted.current = true;
            if (isInitialLoading) {
                fetchData(true);
            } else {
                fetchData(false);
            }
            // Cleanup function
            return () => {
                isMounted.current = false;
            };
        }, [fetchData, isInitialLoading, authState.currentLocation])
    );

    // Using useFocusEffect to fetch data when the screen comes into focus.
    useFocusEffect(
        useCallback(() => {
            isMounted.current = true;
            if (isInitialLoading) {
                fetchData(true);
            } else {
                fetchData(false);
            }
            // Cleanup function
            return () => {
                isMounted.current = false;
            };
        }, [fetchData, isInitialLoading])
    );

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

    // Function to handle pull-to-refresh
    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData(false).then(() => setRefreshing(false));
    }, [fetchData]);

    const width = Dimensions.get("window").width;

    // Showing loading indicator for the initial load
    if (isInitialLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    // Showing error message if there's an error and no data
    if (error && !galleryData.length) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>{error}</Text>
                <Pressable onPress={() => fetchData(true)}>
                    <Text>Retry</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                bounces={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
                <View style={{ flex: 1 }}>
                    <CarouselComponent
                        galleryData={galleryData}
                        navigation={navigation}
                    />
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
                    {!isLocationLoading ? (
                        <View style={styles.section}>
                            <View style={styles.flexSection}>
                                <Text style={styles.sectionTitle}>Nearby</Text>
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("Nearby", {
                                            message:
                                                "This will show the Nearby Data",
                                            nearbyData,
                                        })
                                    }
                                >
                                    <Text style={{ marginBottom: 10 }}>
                                        View All <ChevronForward size={10} />
                                    </Text>
                                </Pressable>
                            </View>

                            <FlatListComponent
                                data={nearbyData}
                                type="Nearby"
                                refreshing={refreshing}
                                handleRefresh={handleRefresh}
                                navigation={navigation}
                                // Real User Location
                                currentLocation={authState.currentLocation}
                            />
                        </View>
                    ) : (
                        <Text style={styles.sectionTitle}>
                            Loading Nearby Artists
                        </Text>
                    )}

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
                                <Text
                                    style={[
                                        styles.sectionTitle,
                                        styles.artVentureTitle,
                                    ]}
                                >
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
        marginBottom: 10,
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
