import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as ArtVentureProvider } from "./src/context/ArtVentureContext";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/navigators/StackNavigator";
import { UserDataProvider } from "./src/context/UserDataContext";

export default function App() {
    return (
      <AuthProvider>
        <UserDataProvider>
          <ArtVentureProvider>
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </ArtVentureProvider>
        </UserDataProvider>
      </AuthProvider>
    );
}
