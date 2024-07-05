import { StyleSheet, Text, Button, SafeAreaView, View } from "react-native";
import { Image } from "expo-image";
import * as Progress from "react-native-progress";
const image = require("../../../../assets/Artboard_3.png");

export default function Onboarding3({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dive into ArtVenture</Text>
      <Text style={styles.description}>
        Join the ArtVenture and unlock exclusive deals and content like never
        before!
      </Text>
      <Image
        style={styles.image}
        source={image}
        contentFit="contain"
        transition={1000}
      />
      <View style={styles.progress}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>03</Text>/03
        </Text>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <Progress.Bar progress={1} width={null} color="black" />
      </View>
      <Button
        style={styles.button}
        color={"black"}
        title="Get Started"
        onPress={() => navigation.navigate("Onboarding4")}
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
  },
});
