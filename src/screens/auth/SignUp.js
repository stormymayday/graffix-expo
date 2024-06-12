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
            Alert.alert(
                "Registration Successful",
                state.registerSuccessMessage,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            clearMessage();
                            navigation.navigate("Login");
                        },
                    },
                ]
            );
        }
    }, [state.registerErrorMessage, state.registerSuccessMessage]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="username"
                value={username}
                onChangeText={(newUsername) => {
                    setUsername(newUsername);
                }}
                autoCapitalize="none"
                autoCorrect={false}
            />
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
                    register({
                        username,
                        email,
                        password,
                    });
                }}
            >
                <Text style={styles.btnText}>register</Text>
            </TouchableOpacity>
            <Button
                title="Already have an account? Sign In!"
                onPress={() => navigation.navigate("Login")}
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
    text: {
        paddingTop: 80,
        marginBottom: 20,
        fontSize: 30,
        fontWeight: "bold",
    },
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
