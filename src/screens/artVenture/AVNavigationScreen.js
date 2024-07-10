import React, { useState, useEffect, useContext, useRef } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Context as AuthContext } from "../../context/AuthContext";
import { haversineDistanceBetweenPoints } from "../../utils/calculateDistance";

export default function AVNavigationScreen({ navigation, route }) {
    // Extracting treasure data
    const { treasure } = route.params;

    // Accessing auth state from context
    const { state: authState } = useContext(AuthContext);

    // State variable to store user's current location
    const [userLocation, setUserLocation] = useState(null);

    // State variable to store distance between user and treasure
    const [distance, setDistance] = useState(null);

    // Tracking calculation status
    const [isCalculating, setIsCalculating] = useState(true);

    // Ref to access the MapView component
    const mapRef = useRef(null);

    useEffect(() => {
        let locationSubscription;

        (async () => {
            try {
                // Requesting permission to access the device's location
                let { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    console.error("Permission to access location was denied");

                    // Updating calculation status
                    setIsCalculating(false);

                    return;
                }

                // Start watching the user's location
                locationSubscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        distanceInterval: 10, // Updating every 10 meters
                    },
                    (location) => {
                        const { latitude, longitude } = location.coords;
                        setUserLocation(location.coords);

                        // Animating map to user's new location
                        if (mapRef.current && mapRef.current.animateToRegion) {
                            mapRef.current.animateToRegion(
                                {
                                    latitude,
                                    longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                },
                                1000 // Animation duration in ms
                            );
                        }

                        // Calculating distance to treasure
                        if (
                            treasure &&
                            treasure.location &&
                            treasure.location.coordinates
                        ) {
                            const dist = haversineDistanceBetweenPoints(
                                latitude,
                                longitude,
                                treasure.location.coordinates[1],
                                treasure.location.coordinates[0]
                            );

                            const roundedDist =
                                typeof dist === "number"
                                    ? Math.round(dist)
                                    : null;

                            console.log("Calculated distance:", roundedDist);
                            setDistance(roundedDist);

                            // Updating calculation status
                            setIsCalculating(false);
                        } else {
                            console.error(
                                "Treasure location data is incomplete"
                            );
                            setDistance(null);

                            // Updating calculation status
                            setIsCalculating(false);
                        }
                    }
                );
            } catch (error) {
                console.error("Error setting up location tracking:", error);

                // Update calculation status
                setIsCalculating(false);
            }
        })();

        // Cleanup function to remove location subscription
        return () => {
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    }, [treasure]);

    // Function to render treasure marker image
    const renderMarkerImage = (treasureUrl) => (
        <Image
            source={{ uri: treasureUrl }}
            style={{ width: 30, height: 30, borderRadius: 15 }}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: treasure.location.coordinates[1],
                    longitude: treasure.location.coordinates[0],
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {/* Marker for treasure location */}
                <Marker
                    coordinate={{
                        latitude: treasure.location.coordinates[1],
                        longitude: treasure.location.coordinates[0],
                    }}
                    title={treasure.title}
                    description={treasure.description}
                >
                    {renderMarkerImage(treasure.treasureUrl)}
                </Marker>
                {/* Marker for user's location */}
                {userLocation && (
                    <Marker
                        coordinate={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                        }}
                        title="Your Location"
                    >
                        <Ionicons name="person" size={30} color="#007AFF" />
                    </Marker>
                )}
            </MapView>
            {/* Displaying distance to treasure */}

            <View style={styles.distanceContainer}>
                <Text style={styles.distanceText}>
                    {isCalculating
                        ? "Calculating distance..."
                        : distance !== null
                        ? `Distance: ${distance} m`
                        : "Unable to calculate distance"}
                </Text>
            </View>
            {/* Button to navigate to QR code scanning screen */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate("AVScanQRCodeScreen", { treasure })
                    }
                >
                    <Ionicons name="camera" size={30} color="white" />
                </TouchableOpacity>
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
    distanceContainer: {
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: 10,
        borderRadius: 5,
    },
    distanceText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
    },
    button: {
        backgroundColor: "black",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
