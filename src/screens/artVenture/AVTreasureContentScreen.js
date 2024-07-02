import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";

export default function AVTreasureContentScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Treasure Content Screen</Text>
            <Button
                title="to Success Screen"
                onPress={() => navigation.navigate("AVSuccessScreen")}
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
