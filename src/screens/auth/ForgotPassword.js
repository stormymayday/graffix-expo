import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export default function ForgotPassword({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ForgotPassword Screen</Text>
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
