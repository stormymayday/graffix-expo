import { useContext, useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, SafeAreaView, Image } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as ArtVentureContext } from "../../context/ArtVentureContext";
import { Ionicons } from "@expo/vector-icons";

export default function AVMapViewFilterResultsScreen({ navigation, route }) {
    // Reference to the MapView component
    const mapRef = useRef(null);

    // Getting current user location from AuthContext
    const { state: authState } = useContext(AuthContext);
    const { currentLocation } = authState;

    // Getting selected categories from route params
    const { categories } = route.params;

    // Getting treasures from ArtVentureContext
    const { state } = useContext(ArtVentureContext);

    // Filtering treasures based on selected categories
    const filteredTreasures = state.treasures.filter((item) =>
        categories.includes(item.category)
    );

    // Function to render treasure marker image
    const renderMarkerImage = (treasureUrl) => (
        <Image
            source={{ uri: treasureUrl }}
            style={{ width: 30, height: 30, borderRadius: 15 }}
        />
    );

    // Function to fit map to show all markers and user location
    const fitMapToMarkersAndUser = () => {
        if (currentLocation && filteredTreasures.length > 0) {
            const coordinates = [
                {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                },
                ...filteredTreasures.map((t) => ({
                    latitude: t.location.coordinates[1],
                    longitude: t.location.coordinates[0],
                })),
            ];

            mapRef.current.fitToCoordinates(coordinates, {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: true,
            });
        } else if (currentLocation) {
            // If no treasures, just center on user location
            mapRef.current.animateToRegion(
                {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
                1000
            );
        }
    };

    // Effect to fit map when currentLocation or filteredTreasures change
    useEffect(() => {
        if (currentLocation) {
            fitMapToMarkersAndUser();
        }
    }, [filteredTreasures, currentLocation]);

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={currentLocation}
            >
                {/* User location marker */}
                {currentLocation && (
                    <Marker coordinate={currentLocation} title="You are here">
                        <Ionicons name="person" size={30} color="#007AFF" />
                    </Marker>
                )}
                {/* Treasure markers */}
                {filteredTreasures.map((treasure) => (
                    <Marker
                        key={treasure._id}
                        coordinate={{
                            latitude: treasure.location.coordinates[1],
                            longitude: treasure.location.coordinates[0],
                        }}
                        onPress={() =>
                            navigation.navigate(
                                "AVMapViewSingleTreasureScreen",
                                { treasureId: treasure._id }
                            )
                        }
                    >
                        {renderMarkerImage(treasure.treasureUrl)}
                    </Marker>
                ))}
            </MapView>
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
    map: {
        width: "100%",
        height: "100%",
    },
});
