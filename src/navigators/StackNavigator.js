import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import ForgotPassword from "../screens/auth/ForgotPassword";
import Nearby from "../screens/home/Nearby";
import Categories from "../screens/home/Categories";
import ArtistDetail from "../screens/home/ArtistDetail";
import ArtDetail from "../screens/home/ArtDetail";
import { BottomTabNavigator } from "./BottomTabNavigator";
import Onboarding from "../screens/home/Onboarding/Onboarding";
import Onboarding2 from "../screens/home/Onboarding/Onboarding2";
import Onboarding3 from "../screens/home/Onboarding/Onboarding3";
import Onboarding4 from "../screens/home/Onboarding/Onboarding4";

const Stack = createNativeStackNavigator();

export function StackNavigator() {
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
      {/**************************** Onboarding Screen ********************************/}
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />
      <Stack.Screen name="Onboarding4" component={Onboarding4} />
      <Stack.Screen
        name="Graffix"
        component={BottomTabNavigator}
        options={{
          headerBackVisible: false,
          headerShown: false,
        }}
      />
      {/**************************** Home Screen ********************************/}
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Nearby" component={Nearby} />
      <Stack.Screen name="ArtistDetail" component={ArtistDetail} />
      <Stack.Screen name="ArtDetail" component={ArtDetail} />
    </Stack.Navigator>
  );
}
