import React from "react";
import { FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";

const ArtList = ({ data, navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.artContainer}
      onPress={() => navigation.navigate("ArtDetail", { item })}
    >
      <Image source={{ uri: item.artworkUrl }} style={styles.artImage} />
    </TouchableOpacity>
  );

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
});

export default ArtList;
