import { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import {
    StyleSheet,
    Text,
    TextInput,
    Button,
    SafeAreaView,
    TouchableOpacity,
    Alert,
} from "react-native";

export default function Login({ navigation }) {
    const { state, login, clearMessage } = useContext(AuthContext);

    const [email, setEmail] = useState("john@gmail.com");
    const [password, setPassword] = useState("password123");

    useEffect(() => {
        if (state.loginErrorMessage) {
            const formattedMessage = state.loginErrorMessage
                .split(",")
                .map((msg, index) => `• ${msg.trim()}`)
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
            Alert.alert("Login Successful", state.loginSuccessMessage, [
                {
                    text: "OK",
                    onPress: () => {
                        clearMessage();
                        navigation.navigate("GoOnboarding");
                    },
                },
            ]);
        }
    }, [state.loginErrorMessage, state.loginSuccessMessage]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={(newEmail) => {
                    setEmail(newEmail);
                }}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholder="password"
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
                    login({
                        email,
                        password,
                    });
                }}
            >
                <Text style={styles.btnText}>login</Text>
            </TouchableOpacity>
            <Button
                title="Don't have an account? Sign Up!"
                onPress={() => navigation.navigate("SignUp")}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    text: { marginTop: 80, marginBottom: 20, fontSize: 30, fontWeight: "bold" },
    input: {
        height: 30,
        width: 250,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
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
});
