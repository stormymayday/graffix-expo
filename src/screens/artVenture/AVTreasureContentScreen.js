import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import graffixAPI from "../../api/graffixAPI";

// Getting the width of the device screen
const { width } = Dimensions.get("window");

export default function AVTreasureContentScreen({ navigation, route }) {
    // Extracting treasureData from route params
    const { treasureData } = route.params;

    // State variable to manage loading status
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle adding treasure to collection
    const handleAddToCollection = async () => {
        setIsLoading(true);
        try {
            const response = await graffixAPI.post(
                `/api/v1/treasure/add-to-collection/${treasureData._id}`
            );

            if (response.status === 200) {
                navigation.navigate("AVSuccessScreen");
            } else {
                Alert.alert(
                    "Failed to add treasure to collection. Please try again."
                );
            }
        } catch (error) {
            console.error("API request error:", error);
            Alert.alert(
                "An error occurred while adding the treasure to your collection. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Heading */}
                <View style={styles.headingContainer}>
                    <Text style={styles.mainHeading}>Exclusive Content</Text>
                </View>

                {/* Full-width treasure image */}
                <Image
                    source={{ uri: treasureData.treasureUrl }}
                    style={styles.fullWidthImage}
                />

                <View style={styles.textContainer}>
                    {/* Treasure title */}
                    <Text style={styles.title}>{treasureData.title}</Text>

                    {/* Treasure category */}
                    <View style={styles.categoryContainer}>
                        <Text style={styles.category}>
                            {treasureData.category}
                        </Text>
                    </View>

                    {/* Message from creator */}
                    <Text style={styles.messageLabel}>
                        Message from creator
                    </Text>
                    <Text style={styles.message}>{treasureData.message}</Text>

                    {/* The Artist heading */}
                    <Text style={styles.artistHeading}>The Artist</Text>

                    {/* Creator Card */}
                    <View style={styles.creatorCard}>
                        <Image
                            source={{ uri: treasureData.treasureUrl }}
                            style={styles.creatorAvatar}
                        />
                        <View style={styles.creatorInfo}>
                            <Text style={styles.creatorName}>
                                {treasureData.title}
                            </Text>
                            <TouchableOpacity style={styles.viewProfileButton}>
                                <Text style={styles.viewProfileButtonText}>
                                    Visit Profile
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Action buttons */}
                <View style={styles.buttonContainer}>
                    {/* Close button */}
                    <TouchableOpacity style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="black" />
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    {/* Collect button */}
                    <TouchableOpacity
                        style={styles.collectButton}
                        onPress={handleAddToCollection}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <>
                                <Ionicons
                                    name="checkmark"
                                    size={24}
                                    color="white"
                                />
                                <Text style={styles.collectButtonText}>
                                    Collect
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        alignItems: "center",
        paddingBottom: 20,
    },
    headingContainer: {
        width: "100%",
        paddingHorizontal: "5%",
        marginVertical: 20,
    },
    mainHeading: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "left",
    },
    fullWidthImage: {
        width: width,
        height: width,
        resizeMode: "cover",
    },
    textContainer: {
        width: "90%",
        alignItems: "flex-start",
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "left",
        alignSelf: "flex-start",
    },
    categoryContainer: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginBottom: 15,
        alignSelf: "flex-start",
        marginBottom: 30,
    },
    category: {
        fontSize: 16,
    },
    messageLabel: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 5,
    },
    message: {
        fontSize: 16,
        textAlign: "left",
        marginBottom: 35,
    },
    artistHeading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    creatorCard: {
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
    },
    creatorAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    creatorInfo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    creatorName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    viewProfileButton: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: "#FFF",
    },
    viewProfileButtonText: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginTop: 20,
    },
    closeButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderColor: "#000",
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    closeButtonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    collectButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#000",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        marginLeft: 10,
    },
    collectButtonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
});
