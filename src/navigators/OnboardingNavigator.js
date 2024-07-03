import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigator } from "./BottomTabNavigator";
import Onboarding from "../screens/home/Onboarding/Onboarding";
import Onboarding2 from "../screens/home/Onboarding/Onboarding2";
import Onboarding3 from "../screens/home/Onboarding/Onboarding3";
import Onboarding4 from "../screens/home/Onboarding/Onboarding4";

const Stack = createNativeStackNavigator();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitle: "Graffix",
      }}
    >
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
    </Stack.Navigator>
  );
}
