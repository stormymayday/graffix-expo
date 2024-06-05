import { NavigationContainer } from "@react-navigation/native";
import { MyStack } from "./navigators/StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
