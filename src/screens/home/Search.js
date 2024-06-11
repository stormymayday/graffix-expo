import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SearchResultsScreen({ navigation }) {
  const [artistName, setArtistName] = useState("");
  const [artistsData, setArtistsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const fetchData = async () => {
    setNoResults(false);

    if (artistName == "") {
      setError(true);
      setArtistsData([]);
      return;
    }

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      const data = await response.json();

      const filterArr = data.filter((item) =>
        item.name.toLowerCase().includes(artistName.trim().toLowerCase())
      );

      if (filterArr.length == 0) {
        setNoResults(true);
      }

      setArtistsData(filterArr);
      setError(false);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const dummyFunction = () => {
    alert("I will go to the details screen when I get pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.searchBar, error ? styles.error : ""]}>
        <TextInput
          style={styles.input}
          placeholder="Search Artists"
          onChangeText={setArtistName}
        />
        <Ionicons
          name="search"
          size={24}
          style={{ padding: 10 }}
          onPress={fetchData}
        />
      </View>
      {error ? (
        <View>
          <Text style={{ color: "red", paddingBottom: 10 }}>
            Artist name is required
          </Text>
        </View>
      ) : (
        ""
      )}
      {noResults ? (
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              paddingBottom: 10,
              paddingTop: 10,
            }}
          >
            Oh no, seems like we couldn’t find a match for {artistName}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Search Help</Text>
          <FlatList
            data={[
              { value: "Check your search for typos" },
              {
                value:
                  "The artist you’re searching for may not yet be in our database.",
              },
              {
                value: "Please try searching again with a different spelling.",
              },
            ]}
            renderItem={({ item }) => {
              return (
                <View style={{ marginBottom: 10 }}>
                  <Text>{`\u2022 ${item.value}`}</Text>
                </View>
              );
            }}
          />

          <View>
            <Text style={styles.trendingTitle}>
              You may want to check this out
            </Text>
            <View style={styles.box}>
              <Pressable onPress={dummyFunction}>
                <Image
                  style={styles.image}
                  source="https://picsum.photos/200"
                  contentFit="fill"
                  transition={1000}
                />
                <Text style={styles.trendingCardTitle}>Random Artist</Text>
              </Pressable>
              <Pressable onPress={dummyFunction}>
                <Image
                  style={styles.image}
                  source="https://picsum.photos/200"
                  contentFit="fill"
                  transition={1000}
                />
                <Text style={styles.trendingCardTitle}>Random Artist</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : (
        ""
      )}
      <View style={styles.listContainer}>
        <FlatList
          data={artistsData}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={styles.card}
                onPress={() =>
                  alert(`Goes to a screen with ${item.name} details`)
                }
              >
                <Text style={{ width: "95%" }}>{item.name}</Text>
                <Ionicons
                  style={{ alignSelf: "center" }}
                  name="chevron-forward"
                />
              </Pressable>
            );
          }}
          ItemSeparatorComponent={<View style={{ height: 16 }} />}
          ListEmptyComponent={
            !noResults && (
              <View>
                <Text style={styles.trendingTitle}>Trending Artists</Text>
                <View style={styles.box}>
                  <Pressable onPress={dummyFunction}>
                    <Image
                      style={styles.image}
                      source="https://picsum.photos/200"
                      contentFit="fill"
                      transition={1000}
                    />
                    <Text style={styles.trendingCardTitle}>Random Artist</Text>
                  </Pressable>
                  <Pressable onPress={dummyFunction}>
                    <Image
                      style={styles.image}
                      source="https://picsum.photos/200"
                      contentFit="fill"
                      transition={1000}
                    />
                    <Text style={styles.trendingCardTitle}>Random Artist</Text>
                  </Pressable>
                </View>
              </View>
            )
          }
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    padding: 10,
    width: "80%",
    fontSize: 20,
  },
  listContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  box: {
    flexDirection: "row",
    gap: 10,
  },
  card: {
    backgroundColor: "white",
    flexDirection: "row",
    gap: 5,
    padding: 16,
    borderBottomWidth: 1,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  searchBar: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
  },
  error: {
    borderColor: "red",
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 5,
  },
  trendingBox: {
    paddingTop: 10,
  },
  trendingCardTitle: {
    fontWeight: "bold",
  },
});
