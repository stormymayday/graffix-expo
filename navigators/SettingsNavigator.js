import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../screens/home/Settings"
import Profile from "../screens/home/Profile";

const Stack = createNativeStackNavigator();

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
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
