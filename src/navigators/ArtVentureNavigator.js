import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AVTutorialScreen1 from "../screens/artVenture/AVTutorialScreen1";
import AVTutorialScreen2 from "../screens/artVenture/AVTutorialScreen2";
import AVTutorialScreen3 from "../screens/artVenture/AVTutorialScreen3";
import AVFilterScreen from "../screens/artVenture/AVFilterScreen";
import AVMapViewFilterResultsScreen from "../screens/artVenture/AVMapViewFilterResultsScreen";
import AVMapViewSingleTreasureScreen from "../screens/artVenture/AVMapViewSingleTreasureScreen";
import AVNavigationScreen from "../screens/artVenture/AVNavigationScreen";
import AVScanQRCodeScreen from "../screens/artVenture/AVScanQRCodeScreen";
import AVTreasureContentScreen from "../screens/artVenture/AVTreasureContentScreen";
import AVSuccessScreen from "../screens/artVenture/AVSuccessScreen";
import { LogoTitle } from "../components/Home/LogoTitle";

const Stack = createNativeStackNavigator();

export function ArtVentureNavigator() {
    return (
        <Stack.Navigator
            //   screenOptions={
            //     {
            //       // headerShown: false,
            //     }
            //   }
            screenOptions={({ route }) => ({
                headerTitleAlign: "center",
                headerTitle:
                    (route.name == "AVMapViewFilterResultsScreen" ||
                        route.name == "AVMapViewSingleTreasureScreen" ||
                        route.name == "AVNavigationScreen" ||
                        route.name == "AVScanQRCodeScreen" ||
                        route.name == "AVTreasureContentScreen" ||
                        route.name == "AVFilterScreen") &&
                    "ArtVenture",
                headerShadowVisible:
                    (route.name == "AVTutorialScreen1" ||
                        route.name == "AVTutorialScreen2" ||
                        route.name == "AVTutorialScreen3" ||
                        route.name == "AVFilterScreen") &&
                    false,
                headerTintColor: "black",
                headerBackTitleVisible: false,
            })}
            initialRouteName="AVTutorialScreen1"
        >
            <Stack.Screen
                name="AVTutorialScreen1"
                component={AVTutorialScreen1}
                options={{ headerTitle: "" }}
            />
            <Stack.Screen
                name="AVTutorialScreen2"
                component={AVTutorialScreen2}
                options={{ headerTitle: "" }}
            />
            <Stack.Screen
                name="AVTutorialScreen3"
                component={AVTutorialScreen3}
                options={{ headerTitle: "" }}
            />
            <Stack.Screen name="AVFilterScreen" component={AVFilterScreen} />
            <Stack.Screen
                name="AVMapViewFilterResultsScreen"
                component={AVMapViewFilterResultsScreen}
            />
            <Stack.Screen
                name="AVMapViewSingleTreasureScreen"
                component={AVMapViewSingleTreasureScreen}
            />
            <Stack.Screen
                name="AVNavigationScreen"
                component={AVNavigationScreen}
            />
            <Stack.Screen
                name="AVScanQRCodeScreen"
                component={AVScanQRCodeScreen}
            />
            <Stack.Screen
                name="AVTreasureContentScreen"
                component={AVTreasureContentScreen}
            />
            <Stack.Screen
                name="AVSuccessScreen"
                component={AVSuccessScreen}
                options={{ headerTitle: () => <LogoTitle /> }}
            />
        </Stack.Navigator>
    );
}
