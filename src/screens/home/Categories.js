import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export default function Categories({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Categories Screen</Text>
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
