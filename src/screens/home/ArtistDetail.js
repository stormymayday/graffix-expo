import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    SafeAreaView,
} from "react-native";
import graffixAPI from "../../api/graffixAPI";
import ArtList from "../../components/Profile/ArtList";

const ArtistDetailScreen = ({ route, navigation }) => {
    const { artist } = route.params;

    const [user, setUser] = useState(null);
    const [artWorks, setArtWorks] = useState([]);

    const [treasures, setTreasures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("ArtWork");

    // Fetching artworks and treasures
    const fetchUserData = useCallback(async () => {
        if (!artist._id) return;

        setIsLoading(true);

        try {
            // Fetching artworks
            const artResponse = await graffixAPI.get(
                `/api/v1/art/artist/${artist._id}`
            );
            const artWorkData = artResponse.data;
            setArtWorks(
                artWorkData.map((artwork) => ({
                    _id: artwork._id,
                    title: artwork.title,
                    description: artwork.description,
                    category: artwork.category,
                    artworkUrl: artwork.artworkUrl,
                    artistName: artwork.artistName,
                    createdBy: artwork.createdBy,
                }))
            );

            // Fetching treasures
            const treasureResponse = await graffixAPI.get(
                `/api/v1/treasure/artist/${artist._id}`
            );
            setTreasures(treasureResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [artist._id]);

    // Use useFocusEffect to fetch data when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({ title: artist.username });
            fetchUserData();
            setUser({
                name: artist.username,
                avatar: artist.avatar,
                address: artist.address,
                description: artist.bio,
            });
        }, [artist, fetchUserData, navigation])
    );

    // Render individual treasure item
    const renderTreasureItem = ({ item }) => (
        <TouchableOpacity
            style={styles.treasureContainer}
            // onPress={() =>
            //     navigation.navigate("TreasureDetail", { item })
            // }
        >
            <Image
                source={{ uri: item.treasureUrl }}
                style={styles.treasureImage}
            />
        </TouchableOpacity>
    );

    // Showing loading if data is not ready
    if (!user || isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View style={styles.infoContainer}>
                    <View style={styles.header}>
                        <Text style={styles.name}>{user.name}</Text>
                    </View>
                    <Text style={styles.address}>{user.address}</Text>
                    <Text style={styles.description}>{user.description}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.contactButton}
                onPress={() => console.log("Contact pressed")}
            >
                <Text style={styles.contactText}>Contact</Text>
            </TouchableOpacity>

            {/* Tab Buttons */}
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => setActiveTab("ArtWork")}>
                    <Text
                        style={
                            activeTab === "ArtWork"
                                ? styles.activeTabText
                                : styles.inactiveTabText
                        }
                    >
                        ArtWork
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab("ArtVenture")}>
                    <Text
                        style={
                            activeTab === "ArtVenture"
                                ? styles.activeTabText
                                : styles.inactiveTabText
                        }
                    >
                        ArtVenture
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Display ArtList or Treasures based on active tab */}
            {activeTab === "ArtWork" ? (
                <ArtList data={artWorks} navigation={navigation} />
            ) : (
                <FlatList
                    data={treasures}
                    renderItem={renderTreasureItem}
                    keyExtractor={(item) => item._id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={{ paddingBottom: 16 }}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    address: {
        color: "gray",
        marginBottom: 4,
    },
    description: {
        color: "gray",
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
    },
    artContainer: {
        width: "48%",
        backgroundColor: "white",
        marginBottom: 16,
        borderRadius: 8,
        overflow: "hidden",
        alignItems: "center",
        padding: 8,
    },
    artImage: {
        width: "100%",
        height: 160,
        borderRadius: 8,
    },
    contactButton: {
        alignSelf: "center",
        marginBottom: 16,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#BEBEBE",
        borderRadius: 8,
    },
    contactText: {
        color: "#000000",
        fontSize: 16,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 16,
    },
    activeTabText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
    inactiveTabText: {
        fontSize: 16,
        color: "gray",
    },
    treasureContainer: {
        width: "48%",
        backgroundColor: "white",
        marginBottom: 16,
        borderRadius: 8,
        overflow: "hidden",
        alignItems: "center",
        padding: 8,
    },
    treasureImage: {
        width: "100%",
        height: 160,
        borderRadius: 8,
    },
    treasureTitle: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default ArtistDetailScreen;
