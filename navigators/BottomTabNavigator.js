import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/bottomTabScreens/Home";
import ArtVenture from "../screens/bottomTabScreens/ArtVenture";
import Profile from "../screens/bottomTabScreens/Profile";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "ArtVenture") {
            iconName = focused ? "color-palette" : "color-palette-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarIconStyle: { fontSize: 14 },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="ArtVenture" component={ArtVenture} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
