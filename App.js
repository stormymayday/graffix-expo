import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./navigators/AuthNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
