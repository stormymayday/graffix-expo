import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";

export default function AVTutorialScreen3({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>ArtVenture Tutorial Screen 3</Text>
            <Button
                title="Next"
                onPress={() => navigation.navigate("AVFilterScreen")}
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
