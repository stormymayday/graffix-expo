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
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import graffixAPI from "../../api/graffixAPI";

export default function SearchResultsScreen({ navigation }) {
  const [artistName, setArtistName] = useState("");
  const [artistsData, setArtistsData] = useState([]);
  const [randomArtistsData, setRandomArtistsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const fetchRandomArtist = async () => {
    try {
      const response = await graffixAPI.get("/api/v1/users/artists");

      const filterArr = response.data
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

      setRandomArtistsData(filterArr);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchRandomArtist();
  }, []);

  const fetchData = async () => {
    setNoResults(false);

    if (artistName == "") {
      setError(true);
      setArtistsData([]);
      return;
    }

    try {
      const response = await graffixAPI.get("/api/v1/users/artists");

      const filterArr = response.data.filter((item) =>
        item.username.toLowerCase().includes(artistName.trim().toLowerCase())
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
            {randomArtistsData.length > 0 && (
              <View style={styles.box}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("ArtistDetail", {
                      artist: randomArtistsData[0],
                    })
                  }
                >
                  <Image
                    style={styles.image}
                    source={randomArtistsData[0].avatar}
                    contentFit="fill"
                    transition={1000}
                  />
                  <Text style={styles.trendingCardTitle}>
                    {randomArtistsData[0].username}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    navigation.navigate("ArtistDetail", {
                      artist: randomArtistsData[1],
                    })
                  }
                >
                  <Image
                    style={styles.image}
                    source={randomArtistsData[1].avatar}
                    contentFit="fill"
                    transition={1000}
                  />
                  <Text style={styles.trendingCardTitle}>
                    {randomArtistsData[1].username}
                  </Text>
                </Pressable>
              </View>
            )}
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
                  navigation.navigate("ArtistDetail", { artist: item })
                }
              >
                <Text style={{ width: "95%" }}>{item.username}</Text>
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
                {randomArtistsData.length > 0 && (
                  <View style={styles.box}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate("ArtistDetail", {
                          artist: randomArtistsData[0],
                        })
                      }
                    >
                      <Image
                        style={styles.image}
                        source={randomArtistsData[0].avatar}
                        contentFit="fill"
                        transition={1000}
                      />
                      <Text style={styles.trendingCardTitle}>
                        {randomArtistsData[0].username}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        navigation.navigate("ArtistDetail", {
                          artist: randomArtistsData[1],
                        })
                      }
                    >
                      <Image
                        style={styles.image}
                        source={randomArtistsData[1].avatar}
                        contentFit="fill"
                        transition={1000}
                      />
                      <Text style={styles.trendingCardTitle}>
                        {randomArtistsData[1].username}
                      </Text>
                    </Pressable>
                  </View>
                )}
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
