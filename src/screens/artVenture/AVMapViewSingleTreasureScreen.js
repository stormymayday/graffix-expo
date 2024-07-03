import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";

export default function AVMapViewSingleTreasureScreen({ navigation, route }) {
    const { treasureId } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <Text>Single Treasure Map Screen</Text>
            <Text>treasure ID: {treasureId}</Text>
            <Button
                title="To Navigation Screen"
                onPress={() => navigation.navigate("AVNavigationScreen")}
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
