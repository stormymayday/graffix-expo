import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Artist({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View style={styles.container}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.image}
          />
          <View style={styles.infoContainer}>
            <View style={styles.header}>
              <Text style={styles.name}>Ferando Buritto</Text>
              <Pressable onPress={() => navigation.navigate("Setting")}>
                <Feather name="edit" size={18} color="black" />
              </Pressable>
            </View>
            <Text style={styles.address}>154, W 49th Ave, Vancouver</Text>
            <Text style={styles.description}>
              Eccentric painter with a knack for nature. I enjoy hiking and
              nature walks.
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 16,
          }}
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>ArtWork</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontSize: 16, color: "gray" }}>ArtVenture</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {[...Array(3)].map((_, index) => (
            <View
              key={index}
              style={{
                width: "48%",
                height: 150,
                backgroundColor: "lightgray",
                marginBottom: 16,
              }}
            />
          ))}
          <TouchableOpacity
            style={{
              width: "48%",
              height: 150,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "lightgray",
            }}
          >
            <Text style={{ fontSize: 48 }}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0", // or use '#fff' if you want white background
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    color: "gray",
    marginBottom: 4,
  },
  description: {
    color: "gray",
  },
});
