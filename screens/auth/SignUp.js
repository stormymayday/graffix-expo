import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";

export default function SignUpScreen({ navigation }) {
 
  return (
    <SafeAreaView style={styles.container}>
      <Text>Sign Up Screen</Text>
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
