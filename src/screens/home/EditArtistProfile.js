import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import graffixAPI from "../../api/graffixAPI";
import UserDataContext from "../../context/UserDataContext";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

export default function EditArtistProfile({ navigation }) {
    const { userData, updateUser } = useContext(UserDataContext);
    const [name, setName] = useState(userData.username || "");
    const [pronouns, setPronouns] = useState(userData.pronouns || "");
    const [bio, setBio] = useState(userData.bio || "");
    const [instagram, setInstagram] = useState(userData.instagram || "");
    const [behance, setBehance] = useState(userData.behance || "");
    const [website, setWebsite] = useState(userData.website || "");
    const [avatar, setAvatar] = useState(userData.avatar || "");
    const [featuredArt, setFeaturedArt] = useState(userData.featuredArt || "");

    const selectImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.canceled) {
                if (
                    result.assets &&
                    result.assets.length > 0 &&
                    result.assets[0].uri
                ) {
                    setAvatar(result.assets[0].uri);
                }
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };

    const handleImage = (uri) => {
        setFeaturedArt(uri);
    };

    const saveChanges = async () => {
        try {
            const formData = new FormData();
            formData.append("username", name);
            formData.append("pronouns", pronouns);
            formData.append("bio", bio);
            formData.append("instagram", instagram);
            formData.append("behance", behance);
            formData.append("website", website);

            // Check if avatar is a new image or existing URL
            if (avatar && avatar.startsWith("file://")) {
                formData.append("avatar", {
                    uri: avatar,
                    name: `avatar.jpg`,
                    type: `image/jpeg`,
                });
            } else {
                formData.append("avatar", avatar);
            }

            // Check if featured art is a new image or existing URL
            if (featuredArt && featuredArt.startsWith("file://")) {
                formData.append("featuredArt", {
                    uri: featuredArt,
                    name: `featuredArt.jpg`,
                    type: `image/jpeg`,
                });
            } else {
                formData.append("featuredArt", featuredArt);
            }

            // Update userData in context manually
            const updatedUserData = {
                ...userData,
                username: name,
                pronouns: pronouns,
                bio: bio,
                instagram: instagram,
                behance: behance,
                website: website,
                avatar: avatar,
                featuredArt: featuredArt,
            };
            updateUser(updatedUserData); // Update local context with new data

            await graffixAPI.patch("/api/v1/users/update-user", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            navigation.goBack();
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.profileContainer}>
                    <TouchableOpacity onPress={selectImage}>
                        <Image
                            source={
                                avatar
                                    ? { uri: avatar }
                                    : userData.defaultAvatar
                            }
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.iconLabelContainer}>
                        <Ionicons
                            name="person"
                            size={20}
                            color="black"
                            style={styles.icon}
                        />
                        <Text style={styles.label}>Name</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.iconLabelContainer}>
                        <Ionicons
                            name="transgender"
                            size={20}
                            color="black"
                            style={styles.icon}
                        />
                        <Text style={styles.label}>Pronouns</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        value={pronouns}
                        onChangeText={setPronouns}
                    />
                </View>
                <View>
                    <View style={styles.iconLabelContainer}>
                        <Ionicons
                            name="brush"
                            size={20}
                            color="black"
                            style={styles.icon}
                        />
                        <Text style={styles.label}>Featured Art</Text>
                    </View>
                    <ImageUpload handleImage={handleImage} />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.iconLabelContainer}>
                        <Ionicons
                            name="information-circle"
                            size={20}
                            color="black"
                            style={styles.icon}
                        />
                        <Text style={styles.label}>Bio</Text>
                    </View>
                    <TextInput
                        style={[styles.input, styles.bioInput]}
                        value={bio}
                        onChangeText={setBio}
                        multiline
                        numberOfLines={4}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.iconLabelContainer}>
                        <Ionicons
                            name="logo-instagram"
                            size={20}
                            color="black"
                            style={styles.icon}
                        />
                        <Text style={styles.label}>Instagram</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        value={instagram}
                        onChangeText={setInstagram}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.iconLabelContainer}>
                        <Ionicons
                            name="logo-behance"
                            size={20}
                            color="black"
                            style={styles.icon}
                        />
                        <Text style={styles.label}>Behance</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        value={behance}
                        onChangeText={setBehance}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.iconLabelContainer}>
                        <Ionicons
                            name="globe"
                            size={20}
                            color="black"
                            style={styles.icon}
                        />
                        <Text style={styles.label}>Website</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        value={website}
                        onChangeText={setWebsite}
                    />
                </View>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={saveChanges}
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        padding: 16,
    },
    profileContainer: {
        alignItems: "center",
        marginBottom: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    inputContainer: {
        marginBottom: 16,
    },
    iconLabelContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    icon: {
        marginRight: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 8,
    },
    bioInput: {
        height: 100,
    },
    saveButton: {
        backgroundColor: "black",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 16,
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
