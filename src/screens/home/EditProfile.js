import React, { useState, useEffect } from "react";
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

export default function EditProfile({ navigation }) {
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [location, setLocation] = useState({ type: "Point", coordinates: [] }); // Updated to match database structure
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [behance, setBehance] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await graffixAPI.get("api/v1/users/current-user");
        const userData = response.data.userWithoutPassword;
        console.log("User data:", userData);
        setName(userData.username || "");
        setPronouns(userData.pronouns || "");
        setLocation(userData.location || { type: "Point", coordinates: [] }); // Update location state
        setBio(userData.bio || "");
        setInstagram(userData.instagram || "https://www.instagram.com/");
        setBehance(userData.behance || "https://www.instagram.com/");
        setWebsite(userData.website || "https://dribbble.com/");
        setAvatar(userData.avatar || "https://via.placeholder.com/100");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log("ImagePicker result:", result);

      if (!result.cancelled) {
        if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
          console.log("Selected image URI:", result.assets[0].uri);
          setAvatar(result.assets[0].uri);
        } else {
          console.log("Selected image URI not found in result assets.");
        }
      } else {
        console.log("Image selection cancelled");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const saveChanges = async () => {
    try {
      const updatedUser = {
        username: name,
        pronouns: pronouns,
        location: location, // Update location to include type and coordinates
        bio: bio,
        instagram: instagram,
        behance: behance,
        website: website,
        avatar: avatar,
      };

      await graffixAPI.patch("/api/v1/users/update-user", updatedUser);

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
            <Image source={{ uri: avatar }} style={styles.profileImage} />
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
          <TextInput style={styles.input} value={name} onChangeText={setName} />
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
        <View style={styles.inputContainer}>
          <View style={styles.iconLabelContainer}>
            <Ionicons
              name="location"
              size={20}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.label}>Primary Location</Text>
          </View>
          <TextInput
            style={styles.input}
            value={`${location.coordinates[1]}, ${location.coordinates[0]}`} 
            onChangeText={(text) => {
              const [lat, lon] = text.split(", ");
              setLocation({
                type: "Point",
                coordinates: [parseFloat(lon), parseFloat(lat)],
              });
            }}
          />
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
            <Ionicons name="link" size={20} color="black" style={styles.icon} />
            <Text style={styles.label}>Contact Links</Text>
          </View>
        </View>
        <TextInput
          style={styles.input}
          value={instagram}
          onChangeText={setInstagram}
        />
        <TextInput
          style={styles.input}
          value={behance}
          onChangeText={setBehance}
        />
        <TextInput
          style={styles.input}
          value={website}
          onChangeText={setWebsite}
        />
        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
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
