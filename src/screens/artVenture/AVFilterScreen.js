import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";

export default function AVFilterScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Filter Screen</Text>
            <Button
                title="To Results Screen"
                onPress={() =>
                    navigation.navigate("AVMapViewFilterResultsScreen")
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
