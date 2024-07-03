import { useEffect, useContext } from "react";
import { Context as ArtVentureContext } from "../../context/ArtVentureContext";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Button,
    Image,
    ScrollView,
} from "react-native";

export default function AVTutorialScreen1({ navigation }) {
    const { state, fetchTreasures } = useContext(ArtVentureContext);
    useEffect(() => {
        fetchTreasures();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text>ArtVenture Tutorial Screen 1</Text>
                {state.errorMessage ? <Text>{state.errorMessage}</Text> : null}
                <View>
                    {state.treasures.map((treasure) => (
                        <View key={treasure._id} style={styles.treasure}>
                            <Text style={styles.title}>{treasure.title}</Text>
                            <Text>{treasure.description}</Text>
                            <Text>{treasure.message}</Text>
                            <Text>Category: {treasure.category}</Text>
                            <Image
                                source={{ uri: treasure.treasureUrl }}
                                style={styles.image}
                            />
                        </View>
                    ))}
                </View>
                <Button
                    title="Next"
                    onPress={() => navigation.navigate("AVTutorialScreen2")}
                />
                <Button
                    title="Skip"
                    onPress={() => navigation.navigate("AVFilterScreen")}
                />
            </ScrollView>
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
    treasure: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 5,
    },
});
