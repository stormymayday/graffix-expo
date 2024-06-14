import { StyleSheet, Text, View, SafeAreaView, Switch } from "react-native";
import { useState } from "react";

export default function Notifications({ navigation }) {
  const [isPauseEnabled, setIsPauseEnabled] = useState(false);
  const [isFollowingEnabled, setIsFollowingEnabled] = useState(false);
  const [isDiscoveryHuntEnabled, setIsDiscoveryHuntEnabled] = useState(false);
  const [isMessagesEnabled, setIsMessagesEnabled] = useState(false);
  const togglePause = () =>
    setIsPauseEnabled((previousState) => !previousState);
  const toggleFollowing = () =>
    setIsFollowingEnabled((previousState) => !previousState);
  const toggleDiscovery = () =>
    setIsDiscoveryHuntEnabled((previousState) => !previousState);
  const toggleMessage = () =>
    setIsMessagesEnabled((previousState) => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <View style={styles.flexbox}>
        <View>
          <Text style={styles.subtitle}>Pause all</Text>
          <Text>All the notification are paused</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isPauseEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={togglePause}
          value={isPauseEnabled}
        />
      </View>

      <View style={styles.flexbox}>
        <View>
          <Text style={styles.subtitle}>Following</Text>
          <Text>Pause all notification from the artist you follow</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isFollowingEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleFollowing}
          value={isFollowingEnabled}
        />
      </View>

      <View style={styles.flexbox}>
        <View>
          <Text style={styles.subtitle}>Discovery Hunt</Text>
          <Text>Pause all notification from the hunt</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDiscoveryHuntEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDiscovery}
          value={isDiscoveryHuntEnabled}
        />
      </View>

      <View style={styles.flexbox}>
        <View>
          <Text style={styles.subtitle}>Messages</Text>
          <Text>Pause all inbox message notification</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isMessagesEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleMessage}
          value={isMessagesEnabled}
        />
      </View>
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
  flexbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    paddingTop: 10,
  },
  subtitle: {
    fontSize: 24,
  },
});
