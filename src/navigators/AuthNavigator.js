import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import ForgotPassword from "../screens/auth/ForgotPassword";
import { OnboardingNavigator } from "./OnboardingNavigator";
import ArtworkFormInput from "../screens/addArtWork/artWorkFormInput";
import Nearby from "../screens/home/Nearby";
import Categories from "../screens/home/Categories";
import SelectAndUpload from "../screens/addArtWork/selectAndUpload";
// import PersonalDetails from "../screens/home/settings/PersonalDetails";
// import LocationPermission from "../screens/home/settings/LocationPermision";
// import Notifications from "../screens/home/settings/Notifications";
// import ArtistsProfile from "../screens/home/settings/ArtistsProfile";

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerTitle:
          (route.name == "ArtistsProfile" ||
            route.name == "LocationPermission" ||
            route.name == "Notifications" ||
            route.name == "PersonalDetails") &&
          "",
      })}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="SelectAndUpload" component={SelectAndUpload} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Nearby" component={Nearby} />
      <Stack.Screen name="ArtworkFormInput" component={ArtworkFormInput} />
      {/* <Stack.Screen name="ArtistsProfile" component={ArtistsProfile} />
      <Stack.Screen name="LocationPermission" component={LocationPermission} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} /> */}
      <Stack.Screen
        name="GoOnboarding"
        component={OnboardingNavigator}
        options={{
          headerBackVisible: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
