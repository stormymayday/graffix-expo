import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export default function Nearby({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Nearby Screen</Text>
      <Text>{route.params.message}</Text>
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
