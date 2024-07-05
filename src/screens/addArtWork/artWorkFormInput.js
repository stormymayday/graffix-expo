import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    Dimensions,
    Text,
} from "react-native";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import QRCode from "react-native-qrcode-svg";
import HorizontalScrollOptions from "../../components/HorizontallScroll/horizontallScrollCategory";
import axios from "axios";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export default function ArtworkFormInput({ route, navigation }) {
    const { artWork } = route.params;

    const [categories, setCategories] = useState([
        "abstract",
        "oil",
        "impressionism",
        "surrealism",
        "pop art",
        "cubism",
        "expressionism",
    ]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [qrCodeValue, setQrCodeValue] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [QrCodeNeeded, setQrCodeNeeded] = useState(!artWork);
    const [location, setLocation] = useState(null);
    const viewShotRef = useRef(null);
    let treasureId = "123456";

    let flagApi = "art";
    let flagApi2 = "artwork";

    if (QrCodeNeeded) {
        flagApi = "treasure";
        flagApi2 = "treasure";
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    function handleImage(uri) {
        setSelectedImage(uri);
    }

    async function handlePublish() {
        if (!title || !description || !selectedCategory || !selectedImage) {
            Alert.alert("Please fill in all fields");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", selectedCategory.toLowerCase());

        if (QrCodeNeeded) {
            if (!location) {
                Alert.alert("Location not available. Please try again.");
                return;
            }
            formData.append("message", message);
            formData.append("longitude", location.coords.longitude);
            formData.append("latitude", location.coords.latitude);
        }

        if (selectedImage) {
            formData.append(flagApi2, {
                uri: selectedImage,
                name: `${title}.jpg`,
                type: "image/jpeg",
            });
        }

        try {
            const response = await axios.post(
                `https://graffix-server.onrender.com/api/v1/${flagApi}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            if (QrCodeNeeded) {
                treasureId = response.data.treasure._id;
                setQrCodeValue(treasureId);
                // Wait for the state to update and QR code to render
                setTimeout(captureQRCode, 1000);
            }
            Alert.alert("Artwork published successfully");
        } catch (error) {
            if (error.response) {
                Alert.alert(
                    "Failed to publish artwork",
                    error.response.data.msg || "Server responded with an error"
                );
            } else if (error.request) {
                Alert.alert(
                    "Failed to publish artwork",
                    "No response from server"
                );
            } else {
                Alert.alert("Failed to publish artwork", error.message);
            }
        } finally {
            if (!QrCodeNeeded) {
                navigation.navigate("Artist");
            }
        }
    }

    function handleSelectCategory(category) {
        setSelectedCategory(category);
    }

    const captureQRCode = async () => {
        if (viewShotRef.current) {
            const uri = await viewShotRef.current.capture();
            await saveQRCodeToGallery(uri);
            uploadQRCodeImage(uri);
        }
    };

    const saveQRCodeToGallery = async (uri) => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === "granted") {
                const asset = await MediaLibrary.createAssetAsync(uri);
                await MediaLibrary.createAlbumAsync("Download", asset, false);
                Alert.alert("QR code saved to gallery successfully");
            } else {
                Alert.alert("Permission to access gallery is required");
            }
        } catch (error) {
            Alert.alert("Failed to save QR code", error.message);
        }
    };

    const uploadQRCodeImage = async (uri) => {
        const formData = new FormData();
        console.log("Treasure URI is: " + uri);
        formData.append("category", selectedCategory.toLowerCase());
        formData.append("qrcode", {
            uri,
            name: "qr-code.png",
            type: "image/png",
        });

        try {
            console.log("Treasure ID is: " + treasureId);
            const response = await axios.patch(
                `https://graffix-server.onrender.com/api/v1/treasure/${treasureId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            Alert.alert("QR code uploaded successfully");
        } catch (error) {
            Alert.alert("Failed to upload QR code", error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {qrCodeValue ? (
                    <View style={styles.qrContainer}>
                        <Text style={styles.infoText}>
                            ARtVenture has been published, print and paste the
                            generated QR Code
                        </Text>
                        <ViewShot
                            ref={viewShotRef}
                            options={{ format: "png", quality: 1.0 }}
                        >
                            <QRCode
                                value={qrCodeValue}
                                size={200}
                                logo={{ uri: "/mnt/data/image.png" }}
                                logoSize={50}
                                logoBackgroundColor="transparent"
                            />
                        </ViewShot>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={captureQRCode}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.profileButton}
                            onPress={() => navigation.navigate("Artist")}
                        >
                            <Text style={styles.buttonText}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.formContainer}>
                        <ImageUpload handleImage={handleImage} />
                        <TextInput
                            style={styles.input}
                            placeholder="Name your Artwork"
                            placeholderTextColor="#999"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Write about your Artwork"
                            placeholderTextColor="#999"
                            multiline
                            value={description}
                            onChangeText={setDescription}
                        />
                        {QrCodeNeeded && (
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Message for the treasure hunter"
                                placeholderTextColor="#999"
                                multiline
                                value={message}
                                onChangeText={setMessage}
                            />
                        )}
                        <HorizontalScrollOptions
                            options={categories}
                            handleSelectCategory={handleSelectCategory}
                        />
                        <TouchableOpacity
                            style={styles.publishButton}
                            onPress={handlePublish}
                        >
                            <Text style={styles.buttonText}>Publish</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        width: Dimensions.get("window").width,
    },
    qrContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        flex: 1,
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: "#000",
    },
    textArea: {
        height: 100,
    },
    infoText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#000",
        padding: 15,
        marginVertical: 10,
        width: "100%",
        borderRadius: 10,
        alignItems: "center",
    },
    profileButton: {
        backgroundColor: "#fff",
        borderColor: "#000",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        width: "100%",
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#000",
        fontSize: 16,
    },
    publishButton: {
        backgroundColor: "#4CAF50",
        padding: 15,
        marginVertical: 10,
        width: "100%",
        borderRadius: 10,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#999",
        padding: 15,
        marginVertical: 10,
        width: "100%",
        borderRadius: 10,
        alignItems: "center",
    },
});
