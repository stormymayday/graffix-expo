import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

export default function PersonalDetails({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Personal Details</Text>
      <Text>
        <Ionicons name="mail-outline" />
        &nbsp; Email Address
      </Text>
      <TextInput
        style={styles.input}
        placeholder="xyz@gmail.com"
        onChangeText={setEmail}
      />
      <Text>
        <Ionicons name="lock-closed-outline" />
        &nbsp; Password
      </Text>
      <TextInput
        style={styles.input}
        placeholder="passwordabc"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Save" onPress={() => console.log("I was pressed")} />
      <Button
        title="Delete Account"
        onPress={() => console.log("I was pressed")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  input: {
    borderWidth: 1,
    padding: 5,
  },
});
