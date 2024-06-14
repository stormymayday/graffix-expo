import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SelectAndUpload(props) {
  const { artWork } = props;
  const [isArtWork, setIsArtWork] = useState(artWork);
  const navigation = useNavigation();

  useEffect(() => {
    setIsArtWork(artWork);
  }, [artWork]);

  const renderCircle = (isActive) => (
    <View
      style={[styles.circle, { backgroundColor: isActive ? "green" : "grey" }]}
    />
  );

  const handleArtWorkPress = () => {
    setIsArtWork(true);
  };

  const handleArtVenturePress = () => {
    setIsArtWork(false);
  };

  const handleContinuePress = () => {
    navigation.navigate("ArtworkFormInput", { artWork: isArtWork });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select and Upload</Text>
      <Text style={styles.paragraph}>
        Choose to upload to your ArtWork or to ArtVenture
      </Text>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={handleArtWorkPress}
      >
        {renderCircle(isArtWork)}
        <Text>ArtWork</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={handleArtVenturePress}
      >
        {renderCircle(!isArtWork)}
        <Text>ArtVenture</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleContinuePress}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 40,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
