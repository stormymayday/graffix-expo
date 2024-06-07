import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigator } from "./BottomTabNavigator";
import Onboarding from "../screens/home/Onboarding";

const Stack = createNativeStackNavigator();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen
        name="Graffix"
        component={BottomTabNavigator}
        options={{
          headerBackVisible: false,
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}
