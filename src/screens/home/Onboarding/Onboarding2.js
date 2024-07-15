import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  View,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import * as Progress from "react-native-progress";
const image = require("../../../../assets/Artboard_2.png");

export default function Onboarding2({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Discover Artists near you</Text>
      <Text style={styles.description}>
        Discover and support local artists near you—help them grow and thrive!
      </Text>
      <Image
        style={styles.image}
        source={image}
        contentFit="contain"
        transition={1000}
      />
      <View style={styles.progress}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>02</Text>/03
        </Text>
        <Pressable onPress={() => navigation.navigate("Graffix")}>
          <Text>Skip</Text>
        </Pressable>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <Progress.Bar progress={0.66} width={null} color="black" />
      </View>
      {/* <Button
        style={styles.button}
        color={"black"}
        title="Next"
        onPress={() => navigation.navigate("Onboarding3")}
      /> */}

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Onboarding3")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
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
    // alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 10,
    padding: 0,
  },
  title: {
    fontSize: 32,
  },
  description: {
    fontSize: 14,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  progress: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
