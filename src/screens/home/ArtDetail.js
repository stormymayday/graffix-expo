import React, { useEffect, useState, useContext } from "react";
import {
    FlatList,
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import graffixAPI from "../../api/graffixAPI";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserDataContext from "../../context/UserDataContext";

export default function ArtDetail({ route, navigation }) {
    const { item } = route.params;
    const [otherArtworks, setOtherArtworks] = useState([]);
    const [author, setAuthor] = useState({});
    const { userData, updateUser } = useContext(UserDataContext);
    const [isLiked, setIsLiked] = useState(
        userData.likedArtwork.includes(item._id)
    );

    useEffect(() => {
        const title = item.title;
        navigation.setOptions({ title });

        const fetchOtherArtworks = async () => {
            try {
                const response = await graffixAPI.get(
                    `/api/v1/art/artist/${item.createdBy}`
                );
                const filteredArtworks = response.data.filter(
                    (artwork) => artwork._id !== item._id
                );
                setOtherArtworks(filteredArtworks);
            } catch (error) {
                console.error("Error fetching other artworks: ", error);
            }
        };

        fetchOtherArtworks();
    }, [navigation, item]);

    useEffect(() => {
        const fetchUserData = async (userId) => {
            try {
                const response = await graffixAPI.get(
                    `/api/v1/users/${userId}`
                );
                setAuthor(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData(item.createdBy);
    }, [item.createdBy]);

    useEffect(() => {
        setIsLiked(userData.likedArtwork.includes(item._id));
    }, [item, userData.likedArtwork]);

    const handleLikePress = async () => {
        try {
            if (isLiked) {
                const response = await graffixAPI.patch(
                    `/api/v1/users/unlike-artwork/${item._id}`
                );
                if (response.status === 200) {
                    setIsLiked(false);
                    updateUser({
                        // ...userData,
                        likedArtwork: userData.likedArtwork.filter(
                            (_id) => _id !== item._id
                        ),
                    });
                }
            } else {
                const response = await graffixAPI.patch(
                    `/api/v1/users/like-artwork/${item._id}`
                );
                if (response.status === 200) {
                    setIsLiked(true);
                    updateUser({
                        // ...userData,
                        likedArtwork: [...userData.likedArtwork, item._id],
                    });
                }
            }
        } catch (error) {
            console.error("Error liking/unliking artwork: ", error);
        }
    };

    const renderHeader = () => (
        <>
            <Image source={{ uri: item.artworkUrl }} style={styles.image} />
            <View style={styles.titleContainer}>
                <Text style={styles.artName}>{item.title}</Text>
                <TouchableOpacity onPress={handleLikePress}>
                    <Ionicons
                        name={isLiked ? "heart" : "heart-outline"}
                        size={24}
                        color={isLiked ? "red" : "gray"}
                        style={styles.likeIcon}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.author}>By: {item.artistName}</Text>
            <Text style={styles.artType}>{item.category}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.artistContainer}>
                <Image
                    source={{ uri: author.avatar }}
                    style={styles.artistImage}
                />
                <View>
                    <Text style={styles.artistName}>{item.artistName}</Text>
                    <TouchableOpacity
                        style={styles.visitProfileButton}
                        onPress={() =>
                            navigation.navigate("ArtistDetail", {
                                artist: author,
                            })
                        }
                    >
                        <Text style={styles.visitProfileButtonText}>
                            Visit Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.sectionTitle}>More from the artist</Text>
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={otherArtworks}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.otherArtwork}
                        onPress={() =>
                            navigation.navigate("ArtDetail", { item })
                        }
                    >
                        <Image
                            source={{ uri: item.artworkUrl }}
                            style={styles.otherArtworkImage}
                        />
                        <Text style={styles.otherArtworkTitle}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item._id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                ListHeaderComponent={renderHeader}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    image: {
        width: "100%",
        height: 300,
        marginBottom: 16,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    artName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        textTransform: "capitalize",
    },
    likeIcon: {
        padding: 10,
    },
    author: {
        fontSize: 18,
        color: "gray",
        marginBottom: 8,
    },
    artType: {
        fontSize: 18,
        color: "gray",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 16,
    },
    artistContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    artistImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    artistName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    visitProfileButton: {
        marginTop: 4,
        backgroundColor: "#000",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 5,
    },
    visitProfileButtonText: {
        color: "#fff",
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
    },
    otherArtwork: {
        width: "48%",
        marginBottom: 16,
        borderRadius: 8,
        overflow: "hidden",
        alignItems: "center",
        padding: 8,
    },
    otherArtworkImage: {
        width: "100%",
        height: 160,
        borderRadius: 8,
        marginBottom: 4,
    },
    otherArtworkTitle: {
        fontSize: 14,
        textAlign: "center",
    },
});
