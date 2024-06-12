import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { StyleSheet, Text, Button, SafeAreaView, Alert } from "react-native";

export default function Profile({ navigation }) {
    const { state, logout, clearMessage } = useContext(AuthContext);

    useEffect(() => {
        if (state.logoutErrorMessage) {
            const formattedMessage = state.logoutErrorMessage
                .split(",")
                .map((msg, index) => `• ${msg.trim()}`)
                .join("\n");

            Alert.alert("Logout Failed", formattedMessage, [
                {
                    text: "OK",
                    onPress: () => {
                        clearMessage();
                    },
                },
            ]);
        }
        if (state.logoutSuccessMessage) {
            Alert.alert("Logout Successful", state.logoutSuccessMessage, [
                {
                    text: "OK",
                    onPress: () => {
                        clearMessage();
                        navigation.navigate("Login");
                    },
                },
            ]);
        }
    }, [state.logoutErrorMessage, state.logoutSuccessMessage]);

    return (
        <SafeAreaView style={styles.container}>
            <Text>Profile Screen</Text>
            <Button
                title="Settings"
                onPress={() => navigation.navigate("Settings")}
            />
            <Button
                title="Log out"
                onPress={() => {
                    logout();
                    // navigation.navigate("Login");
                }}
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
