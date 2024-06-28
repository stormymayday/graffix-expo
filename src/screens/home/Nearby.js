import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { haversineDistanceBetweenPoints } from "../../utils/calculateDistance";
import MapView, { Marker } from "react-native-maps";

export default function Nearby({ navigation, route }) {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 49.225084624107566,
    longitude: -123.10763364103961,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const { nearbyData } = route.params;

  const renderMarkerImage = (avatar) => (
    <Image
      source={{ uri: avatar }}
      style={{ width: 30, height: 30, borderRadius: 15 }}
    />
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ArtistDetail", { artist: item })}
        style={styles.touchableOpacity}
      >
        <Image style={styles.image} source={{ uri: item.featuredArtUrl }} />
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.distance}>
          {haversineDistanceBetweenPoints(
            item.location.coordinates[1],
            item.location.coordinates[0],
            currentLocation.latitude,
            currentLocation.longitude
          )}{" "}
          m
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} initialRegion={currentLocation}>
        <Marker coordinate={currentLocation} title="You are here" />
        {nearbyData.map((item) => (
          <Marker
            key={item._id}
            coordinate={{
              latitude: item.location.coordinates[1],
              longitude: item.location.coordinates[0],
            }}
            title={item.username}
            description={item.bio}
            onPress={() =>
              navigation.navigate("ArtistDetail", { artist: item })
            }
          >
            {renderMarkerImage(item.avatar)}
          </Marker>
        ))}
      </MapView>

      <FlatList
        data={nearbyData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={<View style={{ height: 16 }} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "40%",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  card: {
    flex: 1,
    margin: 10,
    height: 200,
    alignItems: "center",
  },
  touchableOpacity: {
    flex: 1,
    width: "100%", 
    alignItems: "center", 
  },
  image: {
    width: "100%",
    height: 140, 
  },
  username: {
    fontWeight: "bold",
    textTransform: "capitalize",
    paddingTop: 5,
  },
  distance: {
    paddingTop: 5,
  },
});
