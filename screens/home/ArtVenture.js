import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export default function ArtVenture({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ArtVenture Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
