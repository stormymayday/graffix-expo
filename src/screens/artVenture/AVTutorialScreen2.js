import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";

export default function AVTutorialScreen2({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>ArtVenture Tutorial Screen 2</Text>
            <Button
                title="Next"
                onPress={() => navigation.navigate("AVTutorialScreen3")}
            />
            <Button
                title="Skip"
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
