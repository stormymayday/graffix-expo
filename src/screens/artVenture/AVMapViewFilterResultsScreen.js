import { useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Button,
    FlatList,
} from "react-native";
import { Context as ArtVentureContext } from "../../context/ArtVentureContext";

export default function AVMapViewFilterResultsScreen({ navigation, route }) {
    const { categories } = route.params;
    const { state } = useContext(ArtVentureContext);

    console.log(categories);

    const renderItem = ({ item }) => (
        <View style={styles.treasureItem}>
            <Text style={styles.treasureTitle}>{item.title}</Text>
            <Text style={styles.treasureDescription}>{item.description}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={state.treasures.filter((item) =>
                    categories.includes(item.category)
                )}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
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
    treasureItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    treasureTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    treasureDescription: {
        fontSize: 14,
    },
});
