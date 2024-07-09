import { StyleSheet, Text, View, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "expo-image";

export function CarouselComponent({ galleryData }) {
  const width = Dimensions.get("window").width;

  return (
    <Carousel
      loop
      width={width}
      height={width}
      autoPlay={true}
      data={galleryData}
      scrollAnimationDuration={3000}
      renderItem={({ index }) => (
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={galleryData[index].artworkUrl}
              contentFit="cover"
              transition={1000}
            />
          </View>
          <View style={styles.artDescription}>
            <Text style={styles.white}>Art of the Day</Text>
            <Text style={[styles.artworkName, styles.white]}>
              {galleryData[index].title}
            </Text>
            <Text style={styles.white}>{galleryData[index].artistName}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
  artDescription: {
    marginTop: -100,
    paddingHorizontal: 16,
  },
  white: {
    color: "white",
  },
  artworkName: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
