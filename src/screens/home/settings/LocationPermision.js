import { StyleSheet, Text, View, SafeAreaView, Switch } from "react-native";
import { useState } from "react";

export default function LocationPermission({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Location Permission</Text>
      <View style={styles.flexbox}>
        <View>
          <Text style={styles.subtitle}>Location Access</Text>
          <Text>App would use location for finding local artist</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
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
    gap: 10,
    paddingTop: 10,
  },
  subtitle: {
    fontSize: 24,
  },
});
