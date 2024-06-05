import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";

export default function Login({ navigation }) {
  function login() {
    navigation.navigate("Graffix");
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={login} />
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});
