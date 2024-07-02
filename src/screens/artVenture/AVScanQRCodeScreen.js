import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";

export default function AVScanQRCodeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Scan QR Code Screen</Text>
            <Button
                title="To Treasure Content Screen"
                onPress={() => navigation.navigate("AVTreasureContentScreen")}
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
