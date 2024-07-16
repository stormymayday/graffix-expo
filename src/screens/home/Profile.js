import React, { useState, useEffect, useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import Collector from "./Collector";
import Artist from "./Artist";
import UserDataContext from "../../context/UserDataContext";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[
              styles.tab,
              isFocused ? styles.activeTab : styles.inactiveTab,
            ]}
          >
            <Text
              style={{
                color: isFocused ? "#000" : "#525252",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

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
          <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
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
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: "#CECECE",
    borderRadius: 20,
    margin: 25,
    alignItems: "center",
    justifyContent: "center",
    height: 49,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    height: 49,
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#fff",
    shadowColor: "#121212",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.05,
    shadowRadius: 19.7,
    elevation: 4,
  },
  inactiveTab: {
    backgroundColor: "#CECECE",
  },
});
