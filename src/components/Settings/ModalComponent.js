import { StyleSheet, Text, View, Pressable, Modal } from "react-native";

export function ModalComponent({ logout, isModalVisible, setIsModalVisible }) {
  return (
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
  );
}

const styles = StyleSheet.create({
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
