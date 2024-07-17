import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "../screens/home/EditProfile";
import Profile from "../screens/home/Profile";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ArtDetailFromProfile from "../screens/home/ArtDetailFromProfile";
import Settings from "../screens/home/Settings";
import PersonalDetails from "../screens/home/settings/PersonalDetails";
import LocationPermission from "../screens/home/settings/LocationPermision";
import Notifications from "../screens/home/settings/Notifications";
import ArtistsProfile from "../screens/home/settings/ArtistsProfile";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import SelectAndUpload from "../screens/addArtWork/selectAndUpload";
import ArtworkFormInput from "../screens/addArtWork/artWorkFormInput";
import ArtWorkEdit from "../screens/home/ArtWorkEdit";

const Stack = createNativeStackNavigator();

export function SettingsNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerTintColor: "black",
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                name="ProfileSettings"
                component={Profile}
                options={({ navigation }) => ({
                    title: "Profile",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Settings")}
                            style={{ marginRight: 10 }}
                        >
                            <Icon name="settings" size={25} color="#000" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="ArtDetailFromProfile"
                component={ArtDetailFromProfile}
            />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="ArtistsProfile" component={ArtistsProfile} />
            <Stack.Screen
                name="LocationPermission"
                component={LocationPermission}
            />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
            <Stack.Screen name="SelectAndUpload" component={SelectAndUpload} />
            <Stack.Screen
                name="ArtworkFormInput"
                component={ArtworkFormInput}
            />
            <Stack.Screen name="ArtworkEdit" component={ArtWorkEdit} />
        </Stack.Navigator>
    );
}
