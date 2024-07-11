import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function TreasureDetail({ route, navigation }) {
  const { item } = route.params;
  const [location, setLocation] = useState(null);
  const [pinLocation, setPinLocation] = useState(null);
  const title = item.title;
  navigation.setOptions({ title });

  useEffect(() => {
    if (item.location) {
      setLocation({
        latitude: item.location.coordinates[1],
        longitude: item.location.coordinates[0],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setPinLocation({
        latitude: item.location.coordinates[1],
        longitude: item.location.coordinates[0],
      });
    }
  }, [item.location]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: item.treasureUrl }} style={styles.image} />
        <Text style={styles.label}>Title</Text>
        <Text style={styles.artName}>{item.title}</Text>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.category}>Category</Text>
        <View style={styles.artTypeContainer}>
          <Text style={styles.artType}>{item.category}</Text>
        </View>
        <View style={styles.locationWrapper}>
          {location && (
            <>
              <Text style={styles.label}>Location</Text>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onPress={(e) => setPinLocation(e.nativeEvent.coordinate)}
              >
                {pinLocation && <Marker coordinate={pinLocation} />}
              </MapView>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 16,
  },
  label: {
    color: "#7C7C7C",
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 8,
  },
  category: {
    color: "#000000",
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 8,
    marginBottom: 17,
  },
  artName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 8,
    textTransform: "capitalize",
    lineHeight: 30,
  },
  artTypeContainer: {
    backgroundColor: "#202020",
    borderRadius: 24,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 8,
    marginLeft: 8,
  },
  artType: {
    fontSize: 14,
    color: "#FFF",
  },
  description: {
    fontSize: 14,
    textAlign: "left",
    marginBottom: 32,
    marginLeft: 8,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  locationWrapper: {
    position: "relative",
    marginVertical: 20,
  },
  map: {
    width: "100%",
    height: 300,
    marginVertical: 20,
  },
  locationLabel: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    color: "grey",
  },
  qrCodeWrapper: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  qrCodeImage: {
    width: 200,
    height: 200,
  },
});
