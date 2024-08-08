import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Button,
    Pressable,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { Image } from "expo-image";

const image = require("../../../assets/successIcon.png");

export default function AVSuccessScreen({ navigation }) {
    const handleHomePress = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Home" }],
            })
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text>AV Success Screen</Text> */}
            {/*       
      <Button
        title="ArtVenture"
        color="black"
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "AVTutorialScreen1" }],
            })
          )
        }
      />
      <Button
        title="Home"
        style={styles.homeButton}
        onPress={() => {
          handleHomePress();
        }}
      /> */}

            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={image}
                    contentFit="contain"
                    transition={1000}
                />
                <Text style={styles.successText}>SUCCESS</Text>
            </View>

            <View>
                <Pressable
                    style={[styles.button, styles.homeButton]}
                    onPress={() =>
                        // navigation.navigate("Home")
                        handleHomePress()
                    }
                >
                    <Text style={[styles.text, styles.textHome]}>Homepage</Text>
                </Pressable>

                <Pressable
                    style={[styles.button, styles.artVentureButton]}
                    onPress={() => navigation.navigate("AVTutorialScreen1")}
                >
                    <Text style={[styles.text, styles.textArtVenture]}>
                        ArtVenture
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-around",
        paddingHorizontal: 16,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
    },
    homeButton: {
        backgroundColor: "black",
    },
    artVentureButton: {
        backgroundColor: "white",
        borderWidth: 1,
    },
    textHome: {
        color: "white",
    },
    textArtVenture: {
        color: "black",
    },
    image: {
        flex: 1,
        width: "35%",
        height: 200,
    },
    imageContainer: {
        height: 300,
        alignItems: "center",
    },
    successText: {
        fontSize: 32,
        fontWeight: "bold",
    },
});
