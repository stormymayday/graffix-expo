import { useState, useContext, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import {
  Text,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";

export default function SignUpScreen({ navigation }) {
  const { state, register, clearMessage } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state.registerErrorMessage) {
      const formattedMessage = state.registerErrorMessage
        .split(",")
        .map((msg, index) => `• ${msg.trim()}`)
        .join("\n");

      Alert.alert("Registration Failed", formattedMessage, [
        {
          text: "OK",
          onPress: () => {
            clearMessage();
          },
        },
      ]);
    }
    if (state.registerSuccessMessage) {
      Alert.alert("Registration Successful", state.registerSuccessMessage, [
        {
          text: "OK",
          onPress: () => {
            clearMessage();
            navigation.navigate("Login");
          },
        },
      ]);
    }
  }, [state.registerErrorMessage, state.registerSuccessMessage]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Sign up for free and start exploring!</Text>
      <Text style={styles.bold}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your username"
        value={username}
        onChangeText={(newUsername) => {
          setUsername(newUsername);
        }}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={styles.bold}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your email"
        value={email}
        onChangeText={(newEmail) => {
          setEmail(newEmail);
        }}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={styles.bold}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Create a secure password"
        value={password}
        onChangeText={(newPassword) => {
          setPassword(newPassword);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          register({
            username,
            email,
            password,
          });
        }}
      >
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}>
        <Text style={{ textAlign: "center" }}>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.bold}>Sign In!</Text>
        </Pressable>
      </View>

      {/* <Button
        title="Already have an account? Sign In!"
        onPress={() => navigation.navigate("Login")}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 30,
  },
  text: {
    paddingTop: 80,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginBottom: 20,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  errorMessage: {
    color: "red",
  },
  bold: {
    fontWeight: "bold",
  },
});
