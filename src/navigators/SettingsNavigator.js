import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "../screens/home/EditProfile";
import Profile from "../screens/home/Profile";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ArtDetail from "../screens/home/ArtDetail"
import Settings from "../screens/home/Settings"
import PersonalDetails from "../screens/home/settings/PersonalDetails";
import LocationPermission from "../screens/home/settings/LocationPermision";
import Notifications from "../screens/home/settings/Notifications";
import ArtistsProfile from "../screens/home/settings/ArtistsProfile";

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
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ArtistsProfile" component={ArtistsProfile} />
      <Stack.Screen name="LocationPermission" component={LocationPermission} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
    </Stack.Navigator>
  );
}
