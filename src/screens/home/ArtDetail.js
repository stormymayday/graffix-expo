import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";

export default function ArtDetail({ route, navigation }) {
  const { item } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: item.artName });
  }, [navigation, item.artName]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.artName}>{item.artName}</Text>
      <Text style={styles.author}>By: {item.author}</Text>
      <Text style={styles.artType}>{item.artType}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 16,
  },
  artName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: "gray",
    marginBottom: 8,
  },
  artType: {
    fontSize: 18,
    color: "gray",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
});
