import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import Collector from "./Collector";
import Artist from "./Artist";

const Tab = createMaterialTopTabNavigator();

export default function Profile({ navigation }) {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Tab.Navigator>
          <Tab.Screen name="Collector" component={Collector} />
          <Tab.Screen name="Artist" component={Artist} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
