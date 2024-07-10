import { useEffect, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Context as ArtVentureContext } from "../../context/ArtVentureContext";
import { Context as AuthContext } from "../../context/AuthContext";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Button,
    ScrollView,
    Pressable,
} from "react-native";
import { Image } from "expo-image";
import * as Progress from "react-native-progress";

const image = require("../../../assets/ArtVenture_1.png");

export default function AVTutorialScreen1({ navigation }) {
    const { state: artVentureState, fetchTreasures } =
        useContext(ArtVentureContext);
    const { state: authState } = useContext(AuthContext);

    // useEffect(() => {
    //     if (authState.currentLocation) {
    //         fetchTreasures(authState.currentLocation);
    //     }
    // }, [authState.currentLocation]);

    useFocusEffect(
        useCallback(() => {
            if (authState.currentLocation) {
                console.log("Fetching treasures...");
                fetchTreasures(authState.currentLocation);
            } else {
                console.log("Current location not available");
            }

            return () => {
                // Any cleanup code (if necessary)
            };
        }, [authState.currentLocation])
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* <ScrollView> */}
            <Text style={styles.heading}>Welcome to ArtVenture!</Text>
            <Text style={styles.title}>Find Artwork Nearby</Text>
            <Text style={styles.description}>
                You can just use your location to find nearby artworks.
            </Text>
            <Image
                style={styles.image}
                source={image}
                contentFit="contain"
                transition={1000}
            />
            <View style={styles.progress}>
                <Text>
                    <Text style={{ fontWeight: "bold" }}>01</Text>/03
                </Text>
                <Pressable
                    onPress={() => navigation.navigate("AVFilterScreen")}
                >
                    <Text>Skip</Text>
                </Pressable>
            </View>
            <View style={{ paddingVertical: 10 }}>
                <Progress.Bar progress={0.33} width={null} color="black" />
            </View>
            <Button
                style={styles.button}
                color={"black"}
                title="Next"
                onPress={() => navigation.navigate("AVTutorialScreen2")}
            />

            {/* <Text>ArtVenture Tutorial Screen 1</Text>
        {artVentureState.errorMessage ? (
          <Text>{artVentureState.errorMessage}</Text>
        ) : null}
        <View>
          {artVentureState.treasures.map((treasure) => (
            <View key={treasure._id} style={styles.treasure}>
              <Text style={styles.title}>{treasure.title}</Text>
              <Text>{treasure.description}</Text>
              <Text>{treasure.message}</Text>
              <Text>Category: {treasure.category}</Text>
              <Image
                source={{ uri: treasure.treasureUrl }}
                style={styles.image}
              />
            </View>
          ))}
        </View>
        <Button
          title="Next"
          onPress={() => navigation.navigate("AVTutorialScreen2")}
        />
        <Button
          title="Skip"
          onPress={() => navigation.navigate("AVFilterScreen")}
        /> */}
            {/* </ScrollView> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingVertical: 10,
        padding: 0,
    },
    heading: {
        fontSize: 28,
        lineHeight: 42,
        color: "#EC7673",
    },
    title: {
        fontSize: 24,
        lineHeight: 36,
    },
    description: {
        fontSize: 14,
    },
    image: {
        flex: 1,
        width: "100%",
    },
    progress: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,
    },
    button: {
        backgroundColor: "black",
    },
});
