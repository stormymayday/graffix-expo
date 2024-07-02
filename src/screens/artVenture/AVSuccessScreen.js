import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { CommonActions } from "@react-navigation/native";

export default function AVSuccessScreen({ navigation }) {
    const handleHomePress = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Home" }],
            })
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text>AV Success Screen</Text>
            <Button
                title="ArtVenture"
                onPress={() =>
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "AVTutorialScreen1" }],
                        })
                    )
                }
            />
            <Button
                title="Home"
                onPress={() => {
                    handleHomePress();
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
