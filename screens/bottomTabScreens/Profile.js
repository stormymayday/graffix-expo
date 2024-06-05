import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";

export default function Profile({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile Screen</Text>
      <Button
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
      />
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
