import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/stackScreens/Login";
import SignUp from "../screens/stackScreens/SignUp";
import Onboarding from "../screens/stackScreens/Onboarding";
import Settings from "../screens/stackScreens/Settings";
import { MyTabs } from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="Graffix"
        component={MyTabs}
        options={{
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
