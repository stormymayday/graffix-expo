import React, { useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Pressable,
    SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import graffixAPI from "../../api/graffixAPI";
import UserDataContext from "../../context/UserDataContext";

export default function Artist({ navigation, route }) {
    const { userData, updateUser } = useContext(UserDataContext);
    const [artWorks, setArtWorks] = useState([]);

    const [treasures, setTreasures] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("ArtWork");

    const fetchUserData = useCallback(async (userId) => {
        if (!userId) return;

        setIsLoading(true);

        try {
            // Fetching artworks
            const artResponse = await graffixAPI.get(
                `/api/v1/art/artist/${userId}`
            );

            const artWorkData = artResponse.data;

            setArtWorks(
                artWorkData.map((artwork) => ({
                    id: artwork._id,
                    artName: artwork.title,
                    description: artwork.description,
                    category: artwork.category,
                    imageUrl: artwork.artworkUrl,
                    author: artwork.artistName,
                }))
            );

            // Fetching treasures
            const treasureResponse = await graffixAPI.get(
                `/api/v1/treasure/artist/${userId}`
            );
            // Storing treasures in state
            setTreasures(treasureResponse.data);
            // Console log for debugging
            // console.log("Fetched treasures:", treasureResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (userData) {
                fetchUserData(userData._id);
            }
        }, [userData, fetchUserData])
    );

    const renderArtworkItem = ({ item }) => (
        <TouchableOpacity
            style={styles.artContainer}
            onPress={() =>
                navigation.navigate("ArtDetailFromProfile", { item })
            }
        >
            <Image source={{ uri: item.imageUrl }} style={styles.artImage} />
        </TouchableOpacity>
    );

    const renderTreasureItem = ({ item }) => (
        <TouchableOpacity
            style={styles.treasureContainer}
            // Need to Implement the navigation:
            // onPress={() =>
            //     navigation.navigate("TreasureDetailFromProfile", { item })
            // }
        >
            <Image
                source={{ uri: item.treasureUrl }}
                style={styles.treasureImage}
            />
        </TouchableOpacity>
    );

    if (!userData || isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <Pressable onPress={() => navigation.navigate("EditProfile")}>
                    <Image
                        source={{ uri: userData.avatar }}
                        style={styles.avatar}
                    />
                </Pressable>

                <View style={styles.infoContainer}>
                    <View style={styles.header}>
                        <Pressable
                            onPress={() => navigation.navigate("EditProfile")}
                        >
                            <Text style={styles.name}>{userData.username}</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => navigation.navigate("EditProfile")}
                        >
                            <Feather name="edit" size={18} color="black" />
                        </Pressable>
                    </View>
                    <Text style={styles.address}>
                        {userData.location
                            ? userData.location.coordinates.join(",")
                            : ""}
                    </Text>
                    <Text style={styles.description}>{userData.bio}</Text>
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: 16,
                }}
            >
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

            <FlatList
                data={activeTab === "ArtWork" ? artWorks : treasures}
                renderItem={
                    activeTab === "ArtWork"
                        ? renderArtworkItem
                        : renderTreasureItem
                }
                // keyExtractor={(item) => item._id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{ paddingBottom: 16 }}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate("SelectAndUpload")}
            >
                <Feather name="plus" size={24} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

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
    fab: {
        position: "absolute",
        bottom: 30,
        right: 10,
        backgroundColor: "#202020",
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    // New Styles
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
