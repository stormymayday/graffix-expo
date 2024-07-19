import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Switch } from "react-native";
import UserDataContext from "../../../context/UserDataContext";

export default function ArtistsProfile({ navigation }) {
  const { userData, updateUser } = useContext(UserDataContext);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Initialize switch state based on user's role
    if (userData?.role === "artist") {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [userData]);

  const toggleSwitch = () => {
    const newRole = isEnabled ? "artlover" : "artist";
    setIsEnabled((previousState) => !previousState);
    updateUser({ role: newRole });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore your Artist Side</Text>

      <View style={styles.flexbox}>
        <View style={{ width: "80%" }}>
          <Text style={styles.subtitle}>Turn on your Artist Profile</Text>
          <Text>You would be able to toggle between collector and artist.</Text>
        </View>
        <Switch
          style={{ width: "15%" }}
          trackColor={{ false: "#EC7673", true: "#EC7673" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#f4f3f4"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  flexbox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingTop: 10,
  },
  subtitle: {
    fontSize: 24,
  },
});
