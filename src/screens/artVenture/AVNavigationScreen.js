import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";

export default function AVNavigationScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Navigation Screen</Text>
            <Button
                title="To Scan QRCode Screen"
                onPress={() => navigation.navigate("AVScanQRCodeScreen")}
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
