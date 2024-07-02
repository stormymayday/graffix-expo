import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Button,
} from "react-native";

const categories = [
    "abstract",
    "oil",
    "impressionism",
    "surrealism",
    "pop art",
    "cubism",
    "expressionism",
];

export default function AVFilterScreen({ navigation }) {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter((item) => item !== category)
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                selectedCategories.includes(item) && styles.selectedCategory,
            ]}
            onPress={() => toggleCategory(item)}
        >
            <Text style={styles.categoryText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                numColumns={3}
                columnWrapperStyle={styles.row}
            />
            <Button
                title="To Results Screen"
                onPress={() =>
                    navigation.navigate("AVMapViewFilterResultsScreen", {
                        categories: selectedCategories,
                    })
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
    row: {
        flex: 1,
        justifyContent: "space-around",
        marginBottom: 10,
    },
    categoryItem: {
        margin: 5,
        padding: 10,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        width: 100,
        height: 100,
    },
    selectedCategory: {
        backgroundColor: "#add8e6",
    },
    categoryText: {
        fontSize: 9,
        fontWeight: "bold",
    },
});
