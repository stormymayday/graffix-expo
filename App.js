import { Provider as AuthProvider } from "./src/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./src/navigators/AuthNavigator";

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <AuthNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
}
