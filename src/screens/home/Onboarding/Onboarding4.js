import { StyleSheet, Text, Button, SafeAreaView, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Onboarding3({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Ionicons
          name="balloon"
          style={{ paddingVertical: 10, fontSize: 40 }}
        />
        <Text style={styles.title}>Hello, nice to meet you!</Text>
        <Text style={styles.description}>
          Set your location to start find art and artists around you.
        </Text>
        <Text style={styles.description}>
          We only access your location while you are using this incredible app.
        </Text>
      </View>
      <View>
        <Button
          color={"black"}
          title="Use Current Location"
          onPress={() => navigation.navigate("Graffix")}
        />
      </View>
      {/* <Button title="Start" onPress={() => navigation.navigate("Graffix")} /> */}
      {/* <Button
        title="Image Upload"
        onPress={() => navigation.navigate("SelectAndUpload")}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    marginHorizontal: 30,
    paddingVertical: 10,
    padding: 0,
  },
  title: {
    fontSize: 32,
  },
  description: {
    fontSize: 14,
    paddingVertical: 20,
  },
});
