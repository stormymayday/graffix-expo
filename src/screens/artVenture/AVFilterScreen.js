import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
} from "react-native";

// Array of available categories
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
    // State variable to keep track of selected categories
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Function to toggle category selection
    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            // If category is already selected, remove it
            setSelectedCategories(
                selectedCategories.filter((item) => item !== category)
            );
        } else {
            // If category is not selected, add it
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Rendering individual category item
    const renderItem = ({ item }) => {
        const isSelected = selectedCategories.includes(item);
        return (
            <TouchableOpacity
                style={[
                    styles.categoryItem,
                    // Applying different style if category is selected
                    isSelected && styles.selectedCategory,
                ]}
                onPress={() => toggleCategory(item)}
            >
                <Text
                    style={[
                        styles.categoryText,
                        isSelected && styles.selectedCategoryText,
                    ]}
                >
                    {item}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Select Interests</Text>
            <View style={styles.gridContainer}>
                {/* FlatList to render categories in a grid */}
                <FlatList
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                    numColumns={3}
                    columnWrapperStyle={styles.row}
                />
            </View>
            <TouchableOpacity
                style={styles.applyButton}
                onPress={() =>
                    navigation.navigate("AVMapViewFilterResultsScreen", {
                        categories: selectedCategories,
                    })
                }
            >
                <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    gridContainer: {
        flex: 1,
        justifyContent: "center",
    },
    row: {
        justifyContent: "space-around",
        marginBottom: 10,
    },
    categoryItem: {
        margin: 5,
        padding: 10,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        width: 100,
        height: 100,
    },
    selectedCategory: {
        backgroundColor: "#000000",
    },
    categoryText: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
    },
    selectedCategoryText: {
        color: "#ffffff",
    },
    applyButton: {
        backgroundColor: "#000000",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        width: "90%",
        alignItems: "center",
        marginTop: 20,
    },
    applyButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
