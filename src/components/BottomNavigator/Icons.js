import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

const HomeIcon = require("../../../assets/Home/Filled.svg");
const HomeInactiveIcon = require("../../../assets/Home/Outlined.svg");
const SearchIcon = require("../../../assets/Search/Filled.svg");
const SearchInactiveIcon = require("../../../assets/Search/Search.svg");
const ArtVentureIcon = require("../../../assets/Artventure/outline.svg");
const ArtVentureInactiveIcon = require("../../../assets/Artventure/outline.svg");
const ProfileIcon = require("../../../assets/Profile/Filled.svg");
const ProfileInactiveIcon = require("../../../assets//Profile/Outline.svg");

export function HomeActive({ size, color }) {
  return (
    <Image
      source={HomeIcon}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

export function HomeInactive({ size, color }) {
  return (
    <Image
      source={HomeInactiveIcon}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

export function ArtVentureActive({ size, color }) {
  return (
    <Image
      source={ArtVentureIcon}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

export function ArtVentureInactive({ size, color }) {
  return (
    <Image
      source={ArtVentureInactiveIcon}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

export function SearchActive({ size, color }) {
  return (
    <Image
      source={SearchIcon}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

export function SearchInactive({ size, color }) {
  return (
    <Image
      source={SearchInactiveIcon}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

export function ProfileActive({ size, color }) {
  return (
    <Image
      source={ProfileIcon}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

export function ProfileInactive({ size, color }) {
  return (
    <Image
      source={ProfileInactiveIcon}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
