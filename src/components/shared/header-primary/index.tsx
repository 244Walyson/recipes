import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import SearchBar from "../search-bar";
const statusBarHeight = Constants.statusBarHeight;

const Header = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <View style={styles.headerWrapper}>
            <Text style={styles.headerText}>Encontre</Text>
            <Text style={[styles.headerText, styles.textColored]}>
              {" "}
              as melhores
            </Text>
          </View>
        </View>
        <Text style={styles.recipetext}>receitas</Text>
      </View>
      <SearchBar placeholder="pesquisar..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: "center",
    marginTop: statusBarHeight,
  },
  headerWrapper: {
    flexDirection: "row",
  },
  textWrapper: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  recipetext: {
    fontSize: 34,
    fontWeight: "bold",
  },
  textColored: {
    color: "#F6B100",
  },
  trendingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Header;
