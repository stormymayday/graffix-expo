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
const image = require("../../../../assets/Artboard_1.png");

export default function Onboarding({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore a Word of Diverse Artwork</Text>
      <Text style={styles.description}>
        Immerse yourself in a diverse collection of artwork, from contemporary
        masterpieces to timeless classics.
      </Text>
      <Image
        style={styles.image}
        source={image}
        contentFit="contain"
        transition={1000}
      />
      <View style={styles.progress}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>01</Text>/03
        </Text>
        <Pressable onPress={() => navigation.navigate("Graffix")}>
          <Text>Skip</Text>
        </Pressable>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <Progress.Bar progress={0.33} width={null} color="black" />
      </View>
      <Button
        style={styles.button}
        color={"black"}
        title="Next"
        onPress={() => navigation.navigate("Onboarding2")}
      />
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
    marginHorizontal: 30,
    paddingVertical: 10,
    padding: 0,
  },
  title: {
    fontSize: 32,
    lineHeight: 48,
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
  },
});
