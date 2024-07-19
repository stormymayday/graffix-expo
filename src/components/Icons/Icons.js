import { Image } from "expo-image";

const chevronForwardIcon = require("../../../assets/Icons/chevron_forward.svg");
const favoriteIcon = require("../../../assets/Icons/favorite.svg");
const mapPinIcon = require("../../../assets/Icons/map_pin.svg");
const outlineHeartIcon = require("../../../assets/Icons/outline_heart.svg");
const globeIcon = require("../../../assets/Icons/Position.svg");
const searchIcon = require("../../../assets/Search/Filled.svg");
const logout = require("../../../assets/Icons/logout.svg");
const profileIcon = require("../../../assets/Icons/profile-filled.svg");

export function ChevronForward({ size, color }) {
  return (
    <Image
      source={chevronForwardIcon}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

export function Favorite({ size, color }) {
  return (
    <Image
      source={favoriteIcon}
      contentFit="contain"
      style={{ width: size, height: size, tintColor: color, marginRight: 5 }}
    />
  );
}

export function MapPin({ size, color }) {
  return (
    <Image
      source={mapPinIcon}
      contentFit="contain"
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

export function OutlineHeart({ size, color }) {
  return (
    <Image
      source={outlineHeartIcon}
      contentFit="contain"
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

export function Globe({ size, color }) {
  return (
    <Image
      source={globeIcon}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

export function Search({ size, color }) {
  return (
    <Image
      source={searchIcon}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

export function Logout({ size, color }) {
  return (
    <Image
      source={logout}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

export function Profile({ size, color }) {
  return (
    <Image
      source={profileIcon}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}
