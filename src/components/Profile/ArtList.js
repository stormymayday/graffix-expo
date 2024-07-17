import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";

const image = require("../../../assets/Profile/Union.svg");

const ArtList = ({ data, navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.artContainer}
      onPress={() => navigation.navigate("ArtDetail", { item })}
    >
      <Image source={{ uri: item.artworkUrl }} style={styles.artImage} />
    </TouchableOpacity>
  );

  if (data.length === 0) {
    return (
      <View style={styles.placeholderContainer}>
        <Image style={styles.placeholderImage} source={image} />
        <Text style={styles.placeholderText}>
          Sorry, no post to see yet here.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  );
};

const styles = StyleSheet.create({
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
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  placeholderImage: {
    width: 107.473,
    height: 85.84,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: "#7C7C7C",
  },
});

export default ArtList;
