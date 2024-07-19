import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    Pressable,
    Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { ModalComponent } from "../../components/Settings/ModalComponent";

import { Logout, Profile, ChevronForward } from "../../components/Icons/Icons";

export default function Settings({ navigation }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { state, logout, clearMessage } = useContext(AuthContext);

    useEffect(() => {
        if (state.logoutErrorMessage) {
            const formattedMessage = state.logoutErrorMessage
                .split(",")
                .map((msg, index) => `• ${msg.trim()}`)
                .join("\n");

            Alert.alert("Logout Failed", formattedMessage, [
                {
                    text: "OK",
                    onPress: () => {
                        clearMessage();
                    },
                },
            ]);
        }
        if (state.logoutSuccessMessage) {
            Alert.alert("Logout Successful", state.logoutSuccessMessage, [
                {
                    text: "OK",
                    onPress: () => {
                        clearMessage();
                        navigation.navigate("Login");
                    },
                },
            ]);
        }
    }, [state.logoutErrorMessage, state.logoutSuccessMessage]);

    const data = [
        // {
        //   icon: "id-card",
        //   description: "Personal Details",
        //   screen: "PersonalDetails",
        // },
        // {
        //     icon: "location",
        //     description: "Location Permission",
        //     screen: "LocationPermission",
        // },
        // {
        //     icon: "notifications",
        //     description: "Notifications",
        //     screen: "Notifications",
        // },
        {
            icon: "person",
            description: "Artist Profile",
            screen: "ArtistsProfile",
        },
        {
            icon: "log-out",
            description: "Log Out",
        },
    ];
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Settings and Privacy</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <Pressable
                            style={styles.card}
                            onPress={() =>
                                item.screen
                                    ? navigation.navigate(`${item.screen}`)
                                    : setIsModalVisible(true)
                            }
                        >
                            <View style={styles.flexSection}>
                                <View>
                                    <Text
                                        style={{
                                            textTransform: "capitalize",
                                            fontWeight: "bold",
                                            fontSize: 20,
                                        }}
                                    >
                                        {item.description == "Artist Profile" ? <Profile size={20} /> : <Logout size={20} />}
                                        &nbsp;
                                        {item.description}
                                    </Text>
                                </View>
                                <ChevronForward size={16} />
                            </View>
                        </Pressable>
                    );
                }}
                ItemSeparatorComponent={<View style={{ height: 16 }} />}
            />
            <ModalComponent
                logout={logout}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        paddingVertical: 10,
    },
    flexSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    card: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
});
