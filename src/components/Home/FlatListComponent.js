import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { Image } from "expo-image";
import { haversineDistanceBetweenPoints } from "../../utils/calculateDistance";
import Ionicons from "@expo/vector-icons/Ionicons";

export function FlatListComponent({
    type,
    data,
    refreshing,
    handleRefresh,
    isLiked,
    navigation,
    currentLocation,
}) {
    return (
        <FlatList
            horizontal
            bounces={false}
            data={data}
            renderItem={({ item }) => {
                return type == "Categories" ? (
                    <Pressable
                        style={[styles.card, styles.marginBottom]}
                        onPress={() =>
                            navigation.navigate("Categories", {
                                category: item.category,
                            })
                        }
                    >
                        <Image
                            style={[styles.image, styles.cardImage]}
                            source={item.image}
                            contentFit="cover"
                            transition={1000}
                        />
                        <Text style={styles.categoryText}>{item.category}</Text>
                    </Pressable>
                ) : type == "Nearby" ? (
                    <Pressable
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate("Nearby", {
                                message: "This will show the Nearby Data",
                                nearbyData: data,
                            })
                        }
                    >
                        <Image
                            style={[styles.image, styles.cardImage]}
                            source={item.featuredArtUrl}
                            contentFit="cover"
                            transition={1000}
                        />
                        <Text
                            style={{
                                textTransform: "capitalize",
                                fontWeight: "bold",
                            }}
                        >
                            {item.username}
                        </Text>
                        <Text>
                            <Ionicons name="location" style={{ padding: 10 }} />
                            {haversineDistanceBetweenPoints(
                                item.location.coordinates[1],
                                item.location.coordinates[0],
                                currentLocation.latitude,
                                currentLocation.longitude
                                // 49.225084624107566,
                                // -123.10763364103961
                            )}{" "}
                            m
                        </Text>
                    </Pressable>
                ) : type == "Recently Added" ? (
                    <Pressable
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate("ArtDetail", { item })
                        }
                    >
                        <Image
                            style={[styles.image, styles.cardImage]}
                            source={item.artworkUrl}
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
                                    {item.title.toUpperCase()}
                                </Text>
                                <Text
                                    style={{
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {item.artistName}
                                </Text>
                            </View>
                            <Ionicons
                                name={
                                    isLiked.includes(item._id)
                                        ? "heart"
                                        : "heart-outline"
                                }
                                style={{ padding: 10 }}
                            />
                        </View>
                    </Pressable>
                ) : (
                    ""
                );
            }}
            ItemSeparatorComponent={<View style={{ width: 16 }} />}
            ListEmptyComponent={
                <Text style={styles.trendingCardTitle}>Nothing to show</Text>
            }
            refreshing={refreshing}
            onRefresh={handleRefresh}
        />
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
    flexSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    card: {
        width: 200,
        height: 200,
    },
    cardImage: {
        borderRadius: 5,
    },
    categoryText: {
        textTransform: "capitalize",
        fontWeight: "bold",
        marginTop: -30,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderRadius: 5,
        color: "white",
        fontSize: 16,
    },
    marginBottom: {
        marginBottom: 15,
    },
});
