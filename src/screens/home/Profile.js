import React, { useState, useEffect, useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import Collector from "./Collector";
import Artist from "./Artist"; 
import UserDataContext from "../../context/UserDataContext";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function Profile({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [userRole, setUserRole] = useState(null);
  const { userData, updateUser } = useContext(UserDataContext);

  useEffect(() => {
    if (userData) {
      setUserRole(userData.role);
      setLoading(false);
    }
  }, [userData]);

  const handleTabPress = (callback, text) => {
    setLoadingText(text);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      callback();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>{loadingText}</Text>
        </View>
      )}
      <View style={{ flex: 1, opacity: loading ? 0.2 : 1 }}>
        {userRole === "artist" ? (
          <Tab.Navigator>
            <Tab.Screen
              name="Collector"
              component={Collector}
              options={{ tabBarLabel: "Collector" }}
              listeners={{
                tabPress: (e) => {
                  e.preventDefault();
                  handleTabPress(
                    () => navigation.navigate("Collector"),
                    "Loading collector mode..."
                  );
                },
              }}
            />
            <Tab.Screen
              name="Artist"
              component={Artist}
              options={{ tabBarLabel: "Artist" }}
              listeners={{
                tabPress: (e) => {
                  e.preventDefault();
                  handleTabPress(
                    () => navigation.navigate("Artist"),
                    "Loading Artist mode..."
                  );
                },
              }}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Collector"
              component={Collector}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
