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

const Stack = createNativeStackNavigator();

export function ArtVentureNavigator() {
    return (
        <Stack.Navigator
            screenOptions={
                {
                    // headerShown: false,
                }
            }
            initialRouteName="AVTutorialScreen1"
        >
            <Stack.Screen
                name="AVTutorialScreen1"
                component={AVTutorialScreen1}
            />
            <Stack.Screen
                name="AVTutorialScreen2"
                component={AVTutorialScreen2}
            />
            <Stack.Screen
                name="AVTutorialScreen3"
                component={AVTutorialScreen3}
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
            <Stack.Screen name="AVSuccessScreen" component={AVSuccessScreen} />
        </Stack.Navigator>
    );
}
