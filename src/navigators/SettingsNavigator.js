import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../screens/home/Settings"
import Profile from "../screens/home/Profile";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ArtDetail from "../screens/home/ArtDetail"

const Stack = createNativeStackNavigator();
const TopTabs = createMaterialTopTabNavigator();

export function SettingsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="ProfileSettings"
        component={Profile}
        options={{ title: "Profile" }}
      />
      <Stack.Screen name="ArtDetail" component={ArtDetail} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
