import React, { useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Context as ArtVentureContext } from "../../context/ArtVentureContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { haversineDistanceBetweenPoints } from "../../utils/calculateDistance";
import graffixAPI from "../../api/graffixAPI";

export default function AVMapViewSingleTreasureScreen({ navigation, route }) {
    // Extracting treasureId from route params
    const { treasureId } = route.params;

    // Accessing ArtVenture and Auth contexts
    const { state: artVentureState } = useContext(ArtVentureContext);
    const { state: authState } = useContext(AuthContext);

    // State variable for storing the current treasure and distance to it
    const [treasure, setTreasure] = useState(null);
    const [distance, setDistance] = useState(null);

    const [isCalculatingDistance, setIsCalculatingDistance] = useState(true);

    // State variable for storing Artist data
    const [artistData, setArtistData] = useState(null);

    // Fetching Artist Data
    const fetchArtistData = async (creatorId) => {
        try {
            const response = await graffixAPI.get(`/api/v1/users/${creatorId}`);
            if (response.status === 200) {
                setArtistData(response.data.user);
            } else {
                console.error("Failed to fetch artist data");
            }
        } catch (error) {
            console.error("Error fetching artist data:", error);
        }
    };

    // Effect to find and set the current treasure based on treasureId
    useEffect(() => {
        const foundTreasure = artVentureState.treasures.find(
            (t) => t._id === treasureId
        );
        setTreasure(foundTreasure);
        if (foundTreasure && foundTreasure.createdBy) {
            fetchArtistData(foundTreasure.createdBy);
        }
    }, [treasureId, artVentureState.treasures]);

    // Effect to calculate distance when treasure or user location changes
    useEffect(() => {
        if (treasure && authState.currentLocation) {
            setIsCalculatingDistance(true);

            const dist = haversineDistanceBetweenPoints(
                authState.currentLocation.latitude,
                authState.currentLocation.longitude,
                treasure.location.coordinates[1],
                treasure.location.coordinates[0]
            );
            // setDistance(dist);
            setDistance(Math.round(dist));
            setIsCalculatingDistance(false);
        }
    }, [treasure, authState.currentLocation]);

    // Showing loading state if treasure or user location is not available
    if (!treasure || !authState.currentLocation) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* MapView component to display the treasure location */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: treasure.location.coordinates[1],
                    longitude: treasure.location.coordinates[0],
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {/* Marker for the treasure location */}
                <Marker
                    coordinate={{
                        latitude: treasure.location.coordinates[1],
                        longitude: treasure.location.coordinates[0],
                    }}
                    title={treasure.name}
                    description={treasure.description}
                >
                    <Image
                        source={{ uri: treasure.treasureUrl }}
                        style={styles.markerImage}
                    />
                </Marker>
            </MapView>

            {/* Card container for treasure details */}
            <View style={styles.cardContainer}>
                {/* Treasure image */}
                <Image
                    source={{ uri: treasure.treasureUrl }}
                    style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                    {/* Treasure title */}

                    <Text style={styles.cardTitle}>{treasure.title}</Text>

                    {/* Artist name */}
                    {artistData && (
                        <Text style={styles.artistName}>
                            by {artistData.username}
                        </Text>
                    )}

                    {/* Treasure category */}
                    <View style={styles.categoryContainer}>
                        <Text style={styles.cardCategory}>
                            {treasure.category}
                        </Text>
                    </View>

                    {/* Distance to treasure */}
                    <View style={styles.distanceContainer}>
                        <Ionicons
                            name="location-outline"
                            size={16}
                            color="black"
                        />
                        <Text style={styles.distanceText}>
                            {isCalculatingDistance
                                ? "Calculating..."
                                : distance !== null
                                ? `${distance} m`
                                : "Unable to calculate distance"}{" "}
                        </Text>
                    </View>

                    {/* Start button */}
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity
                            style={styles.startButton}
                            onPress={() =>
                                navigation.navigate("AVNavigationScreen", {
                                    treasure,
                                })
                            }
                        >
                            <Text style={styles.startButtonText}>Start</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    markerImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    cardContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "white",
        borderRadius: 10,
        flexDirection: "row",
        overflow: "hidden",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: 160,
    },
    cardImage: {
        width: 100,
        height: "100%",
        resizeMode: "cover",
    },
    cardContent: {
        flex: 1,
        padding: 10,
        justifyContent: "space-between",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    artistName: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },
    categoryContainer: {
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15,
        paddingVertical: 3,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    cardCategory: {
        fontSize: 14,
        color: "black",
    },
    distanceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    distanceText: {
        marginLeft: 5,
        fontSize: 14,
        color: "black",
    },
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    startButton: {
        backgroundColor: "#000000",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    startButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});
