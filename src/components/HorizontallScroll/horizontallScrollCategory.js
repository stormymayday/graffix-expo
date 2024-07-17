import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HorizontalScrollOptions(props) {
  const { options, handleSelectCategory } = props;
  const [selectedOption, setSelectedOption] = useState(null);

  const handlePress = (option) => {
    setSelectedOption(option);
    handleSelectCategory(option);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedOption === option && styles.selectedButton,
            ]}
            onPress={() => handlePress(option)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedOption === option && styles.selectedButtonText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.bottomLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  categoryText: {
    color: "#888",
    fontSize: 16,
    marginBottom: 10,
  },
  scrollView: {
    width: "100%",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: "#888",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedButtonText: {
    color: "#fff",
  },
  bottomLine: {
    height: 2,
    backgroundColor: "#000",
    marginTop: 10,
  },
});
