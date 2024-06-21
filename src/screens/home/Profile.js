import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Alert,
  StyleSheet,
} from "react-native";
import Collector from "./Collector";
import Artist from "./Artist";

// Create Top Tab Navigator
const Tab = createMaterialTopTabNavigator();

export default function Profile({ navigation }) {
  const { state, logout, clearMessage } = useContext(AuthContext);

  useEffect(() => {
    if (state.logoutErrorMessage) {
      const formattedMessage = state.logoutErrorMessage
        .split(",")
        .map((msg, index) => `• ${msg.trim()}`)
        .join("\n");

      Alert.alert("Logout Failed", formattedMessage, [
        {
          text: "OK",
          onPress: () => {
            clearMessage();
          },
        },
      ]);
    }
    if (state.logoutSuccessMessage) {
      Alert.alert("Logout Successful", state.logoutSuccessMessage, [
        {
          text: "OK",
          onPress: () => {
            clearMessage();
            navigation.navigate("Login");
          },
        },
      ]);
    }
  }, [state.logoutErrorMessage, state.logoutSuccessMessage]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Tab.Navigator>
          <Tab.Screen name="Collector" component={Collector} />
          <Tab.Screen name="Artist" component={Artist} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
