import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as ArtVentureProvider } from "./src/context/ArtVentureContext";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/navigators/StackNavigator";

export default function App() {
    return (
        <AuthProvider>
            <ArtVentureProvider>
                <NavigationContainer>
                    <StackNavigator />
                </NavigationContainer>
            </ArtVentureProvider>
        </AuthProvider>
    );
}
