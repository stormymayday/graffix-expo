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

const image = require("../../../assets/ArtVenture_2.png");

export default function AVTutorialScreen2({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Start Hunting</Text>
      <Text style={styles.description}>
        Follow the navigation to discover city, collect favourite artworks.
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
        <Pressable onPress={() => navigation.navigate("AVFilterScreen")}>
          <Text>Skip</Text>
        </Pressable>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <Progress.Bar progress={0.66} width={null} color="black" />
      </View>
      <Button
        style={styles.button}
        color={"black"}
        title="Next"
        onPress={() => navigation.navigate("AVTutorialScreen3")}
      />
      {/* <Text>ArtVenture Tutorial Screen 2</Text>
      <Button
        title="Next"
        onPress={() => navigation.navigate("AVTutorialScreen3")}
      />
      <Button
        title="Skip"
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
