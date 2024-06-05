import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";

export default function SignUpScreen({ navigation }) {
  function signUp() {
    navigation.navigate("Graffix");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Sign Up Screen</Text>
      <Button title="Sign Up" onPress={signUp} />
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
