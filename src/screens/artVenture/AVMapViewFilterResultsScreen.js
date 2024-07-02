import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";

export default function AVMapViewFilterResultsScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Filter Results Screen</Text>
            <Button
                title="To Single Treasure Screen"
                onPress={() =>
                    navigation.navigate("AVMapViewSingleTreasureScreen")
                }
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
