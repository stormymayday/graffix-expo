import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SelectAndUpload(props) {
  const { artWork } = props;
  const [isArtWork, setIsArtWork] = useState(artWork);
  const navigation = useNavigation();
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    setIsArtWork(artWork);
  }, [artWork]);

  const renderCircle = (isActive) => (
    <View
      style={[styles.circle, { backgroundColor: isActive ? "black" : "grey" }]}
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
    <View style={[styles.container, { paddingTop: screenHeight * 0.1 }]}>
      <Text style={styles.heading}>Select and Upload</Text>
      <Text style={styles.paragraph}>
        Choose to upload your ArtWork or ArtVenture
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleArtWorkPress}
          style={styles.radioButton}
        >
          {renderCircle(isArtWork)}
          <Text style={styles.optionText}>ArtWork</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleArtVenturePress}
          style={styles.radioButton}
        >
          {renderCircle(!isArtWork)}
          <Text style={styles.optionText}>ArtVenture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.continueButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleContinuePress}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    flex: 1,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#202020",
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 16,
    color: "#202020",
    marginBottom: 40,
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 4px 0px #00000040",
    shadowRadius: 4,
    borderRadius: 8,
    padding: 24,
    gap: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: 244,
    height: 44,
    marginBottom: 10,
    justifyContent: "center",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
    position: "absolute",
    left: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "grey",
  },
  continueButtonContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#202020",
    padding: 16,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});
