import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as ArtVentureProvider } from "./src/context/ArtVentureContext";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./src/navigators/AuthNavigator";

export default function App() {
    return (
        <AuthProvider>
            <ArtVentureProvider>
                <NavigationContainer>
                    <AuthNavigator />
                </NavigationContainer>
            </ArtVentureProvider>
        </AuthProvider>
    );
}
