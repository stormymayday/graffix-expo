import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home/Home";
import Profile from "../screens/home/Profile";
import { Ionicons } from "@expo/vector-icons";
import { SettingsNavigator } from "./SettingsNavigator";
import { ArtVentureNavigator } from "./ArtVentureNavigator";
import Search from "../screens/home/Search";

import AVTutorialScreen1 from "../screens/artVenture/AVTutorialScreen1";

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, focused, size }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Search") {
                        iconName = focused ? "search" : "search-outline";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                    } else if (route.name === "ArtVenture") {
                        iconName = focused
                            ? "color-palette"
                            : "color-palette-outline";
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
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
                options={{ title: "Graffix" }}
            />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="ArtVenture" component={ArtVentureNavigator} />
            <Tab.Screen
                name="Profile"
                component={SettingsNavigator}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
}
