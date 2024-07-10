import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  Modal,
  Button,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../../context/AuthContext";

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
    {
      icon: "id-card",
      description: "Personal Details",
      screen: "PersonalDetails",
    },
    {
      icon: "location",
      description: "Location Permission",
      screen: "LocationPermission",
    },
    {
      icon: "notifications",
      description: "Notifications",
      screen: "Notifications",
    },
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
                    <Ionicons
                      name={item.icon}
                      style={{ padding: 10, fontSize: 20 }}
                    />
                    &nbsp;
                    {item.description}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  style={{ padding: 10, fontSize: 20 }}
                />
              </View>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={<View style={{ height: 16 }} />}
      />
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <Text style={styles.modalText}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtonsContainer}>
              <Pressable
                style={styles.button}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={{ color: "gray" }}>Cancel</Text>
              </Pressable>
              <View style={styles.separator}></View>
              <Pressable style={styles.button} onPress={() => logout()}>
                <Text style={{ color: "red" }}>Log Out</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  button: {
    paddingVertical: 10,
  },
  separator: {
    height: "100%",
    width: 1,
    backgroundColor: "black",
  },
  modalText: {
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  modalContainer: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  modalInnerContainer: {
    borderWidth: 1,
    borderRadius: 5,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
