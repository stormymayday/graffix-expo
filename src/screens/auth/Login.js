import { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Pressable,
  View,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import UserDataContext from "../../context/UserDataContext";

const image = require("../../../assets/Graffix_Logo.svg");

export default function Login({ navigation }) {
  const { state, login, clearMessage } = useContext(AuthContext);
  const { fetchUserData } = useContext(UserDataContext);

  const [email, setEmail] = useState("user1@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.loginErrorMessage) {
      const formattedMessage = state.loginErrorMessage
        .split(",")
        .map((msg) => `• ${msg.trim()}`)
        .join("\n");

      Alert.alert("Login Failed", formattedMessage, [
        {
          text: "OK",
          onPress: () => {
            clearMessage();
          },
        },
      ]);
    }
    if (state.loginSuccessMessage) {
      const handleSuccess = async () => {
        setLoading(true);
        await fetchUserData();
        setLoading(false);
        Alert.alert("Login Successful", state.loginSuccessMessage, [
          {
            text: "OK",
            onPress: () => {
              clearMessage();
              navigation.navigate("Onboarding");
            },
          },
        ]);
      };
      handleSuccess();
    }
  }, [state.loginErrorMessage, state.loginSuccessMessage]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={image}
        contentFit="contain"
        transition={1000}
      />
      <Text style={[styles.bold, styles.heading]}>
        Let's Explore Local Creativity
      </Text>
      <Text style={styles.text}>Welcome Back</Text>
      <Text style={styles.bold}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={(newEmail) => setEmail(newEmail)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.bold}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        onChangeText={(newPassword) => setPassword(newPassword)}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => login({ email, password })}
      >
        <Text style={styles.btnText}>Log In</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <View style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}>
        <Text style={{ textAlign: "center" }}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.bold}>Sign Up!</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  text: { marginTop: 20, marginBottom: 20, fontSize: 30, fontWeight: "bold" },
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
  bold: {
    fontWeight: "bold",
  },
  heading: {
    textAlign: "center",
    fontSize: 16,
  },
  image: {
    height: 100,
    width: "100%",
  },
});
