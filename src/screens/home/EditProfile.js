import React, { useState } from "react";
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

export default function Setting({ navigation, route }) {
  const [name, setName] = useState("Ferando Buritto");
  const [pronouns, setPronouns] = useState("She / Her");
  const [location, setLocation] = useState("Vancouver");
  const [bio, setBio] = useState(
    "Eccentric painter with a knack for nature. I enjoy hiking and nature walks."
  );
  const [instagram, setInstagram] = useState("Instagram Link");
  const [behance, setBehance] = useState("Behance link");
  const [website, setWebsite] = useState("Website");
  const [saved, setSaved] = useState(false);

  const saveChanges = () => {
    const updatedUser = {
      name,
      imageUrl: "https://via.placeholder.com/100", // Update the image URL as needed
      address: location,
      description: bio,
    };
    navigation.navigate("Collector", { updatedUser });
    setSaved(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.profileImage}
          />
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
            value={location}
            onChangeText={setLocation}
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

        {saved && <Text style={styles.savedMessage}>Changes saved!</Text>}
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
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 4,
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
