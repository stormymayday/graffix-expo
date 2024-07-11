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
import { LogoTitle } from "../components/Home/LogoTitle";
import TreasureDetail from "../screens/home/TreasureDetal";

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
                        route.name == "PersonalDetails" ||
                        route.name == "Login" ||
                        route.name == "SignUp") &&
                    "",
                headerShadowVisible:
                    (route.name == "Login" ||
                        route.name == "SignUp" ||
                        route.name == "Onboarding" ||
                        route.name == "Onboarding2" ||
                        route.name == "Onboarding3" ||
                        route.name == "Onboarding4") &&
                    false,
                headerTintColor: "black",
                headerBackTitleVisible: false,
            })}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerBackVisible: false,
                }}
            />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            {/**************************** Onboarding Screen ********************************/}
            <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{ headerTitle: () => <LogoTitle /> }}
            />
            <Stack.Screen
                name="Onboarding2"
                component={Onboarding2}
                options={{ headerTitle: () => <LogoTitle /> }}
            />
            <Stack.Screen
                name="Onboarding3"
                component={Onboarding3}
                options={{ headerTitle: () => <LogoTitle /> }}
            />
            <Stack.Screen
                name="Onboarding4"
                component={Onboarding4}
                options={{ headerTitle: () => <LogoTitle /> }}
            />
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
