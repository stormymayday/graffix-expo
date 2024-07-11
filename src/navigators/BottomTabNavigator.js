import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home/Home";
import { Ionicons } from "@expo/vector-icons";
import { SettingsNavigator } from "./SettingsNavigator";
import { ArtVentureNavigator } from "./ArtVentureNavigator";
import Search from "../screens/home/Search";
import { LogoTitle } from "../components/Home/LogoTitle";
import {
  HomeActive,
  HomeInactive,
  SearchActive,
  SearchInactive,
  ProfileActive,
  ProfileInactive,
  ArtVentureActive,
  ArtVentureInactive,
} from "../components/BottomNavigator/Icons";

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          if (route.name === "Home") {
            return focused ? (
              <HomeActive size={size} color={color} />
            ) : (
              <HomeInactive size={size} color={color} />
            );
          } else if (route.name === "Search") {
            return focused ? (
              <SearchActive size={size} color={color} />
            ) : (
              <SearchInactive size={size} color={color} />
            );
          } else if (route.name === "Profile") {
            return focused ? (
              <ProfileActive size={size} color={color} />
            ) : (
              <ProfileInactive size={size} color={color} />
            );
          } else if (route.name === "ArtVenture") {
            return focused ? (
              <ArtVentureActive size={size} color={color} />
            ) : (
              <ArtVentureInactive size={size} color={color} />
            );
          }
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarIconStyle: { fontSize: 14 },
        headerTitleAlign: "center",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: () => <LogoTitle /> }}
      />
      <Tab.Screen
        name="ArtVenture"
        component={ArtVentureNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        name="Profile"
        component={SettingsNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
