import { StyleSheet, Text, Button, SafeAreaView } from "react-native";

export default function Onboarding({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Onboarding Screen</Text>
      <Button title="Start" onPress={() => navigation.navigate("Graffix")} />
      <Button title="Image Upload" onPress={() => navigation.navigate("ArtworkFormInput")} />
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
