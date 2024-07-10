import { StyleSheet } from "react-native";
import { Image } from "expo-image";

const image = require("../../../assets/Graffix_Logo.svg");

export function LogoTitle() {
  return (
    <Image
      style={styles.image}
      source={image}
      contentFit="contain"
      transition={1000}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 20,
  },
});
