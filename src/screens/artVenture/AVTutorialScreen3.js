import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import * as Progress from "react-native-progress";

const image = require("../../../assets/ArtVenture_3.png");

export default function AVTutorialScreen3({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Scan & Collect</Text>
      <Text style={styles.description}>
        Have fun with a clue. Make artwork collection more interesting.
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
        <Pressable onPress={() => navigation.navigate("AVFilterScreen")}>
          <Text>Skip</Text>
        </Pressable>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <Progress.Bar progress={0.99} width={null} color="black" />
      </View>
      <Button
        style={styles.button}
        color={"black"}
        title="Next"
        onPress={() => navigation.navigate("AVFilterScreen")}
      />
      {/* <Text>ArtVenture Tutorial Screen 3</Text>
      <Button
        title="Next"
        onPress={() => navigation.navigate("AVFilterScreen")}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 10,
    padding: 0,
  },
  heading: {
    fontSize: 28,
    lineHeight: 42,
    color: "#EC7673",
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
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
