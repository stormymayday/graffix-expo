import { useState, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { haversineDistanceBetweenPoints } from "../../utils/calculateDistance";
import MapView, { Marker } from "react-native-maps";
import { Context as AuthContext } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Nearby({ navigation, route }) {
    const { state: authState } = useContext(AuthContext);

    const [currentLocation, setCurrentLocation] = useState({
        latitude: authState.currentLocation.latitude,
        longitude: authState.currentLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    });
    const { nearbyData } = route.params;

    const renderMarkerImage = (avatar) => (
        <Image
            source={{ uri: avatar }}
            style={{ width: 30, height: 30, borderRadius: 15 }}
        />
    );

    const renderItem = ({ item }) => (
        <View style={styles.cardWrapper}>
            <View style={styles.card}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("ArtistDetail", { artist: item })
                    }
                    style={styles.touchableOpacity}
                >
                    <Image
                        style={styles.image}
                        source={{ uri: item.featuredArtUrl }}
                    />
                    <Text style={styles.username}>{item.username}</Text>
                    <View style={styles.distanceContainer}>
                        <Ionicons
                            name="location-outline"
                            size={16}
                            color="black"
                            style={styles.locationIcon}
                        />
                        <Text style={styles.distance}>
                            {haversineDistanceBetweenPoints(
                                item.location.coordinates[1],
                                item.location.coordinates[0],
                                currentLocation.latitude,
                                currentLocation.longitude
                            )}{" "}
                            m
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <MapView style={styles.map} initialRegion={currentLocation}>
                {/* <Marker coordinate={currentLocation} title="You are here" /> */}
                {nearbyData.map((item) => (
                    <Marker
                        key={item._id}
                        coordinate={{
                            latitude: item.location.coordinates[1],
                            longitude: item.location.coordinates[0],
                        }}
                        title={item.username}
                        description={item.bio}
                        onPress={() =>
                            navigation.navigate("ArtistDetail", {
                                artist: item,
                            })
                        }
                    >
                        {renderMarkerImage(item.avatar)}
                    </Marker>
                ))}
            </MapView>

            <FlatList
                style={styles.listContainer}
                data={nearbyData}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={<View style={{ height: 0 }} />}
                numColumns={2}
                columnWrapperStyle={styles.row}
                ListHeaderComponent={() => (
                    <View
                        style={
                            nearbyData.length % 2 !== 0
                                ? styles.emptyCard
                                : null
                        }
                    />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    map: {
        width: "100%",
        height: "40%",
    },
    listContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        zIndex: 1,
        marginTop: -20,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    row: {
        flex: 1,
        justifyContent: "flex-start",
        marginBottom: 15,
    },
    cardWrapper: {
        width: "50%",
        padding: 5,
        paddingBottom: 0,
    },
    card: {
        flex: 1,
        height: 200,
        overflow: "hidden",
    },
    emptyCard: {
        width: "50%",
        height: 0,
    },
    touchableOpacity: {
        flex: 1,
        width: "100%",
    },
    image: {
        width: "100%",
        height: 140,
        borderRadius: 8,
        marginBottom: 8,
    },
    cardContent: {
        padding: 8,
    },
    username: {
        fontWeight: "bold",
        textTransform: "capitalize",
        marginBottom: 4,
    },
    distanceContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    locationIcon: {
        marginRight: 4,
    },
    distance: {
        color: "gray",
    },
});
