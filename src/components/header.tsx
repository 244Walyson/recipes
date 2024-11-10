import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
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
      <View style={styles.inputWrapper}>
        <Ionicons name="search" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Pesquisar"
          keyboardType="email-address"
          placeholderTextColor="#F6B100"
        />
      </View>
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#F6B100",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    width: "90%",
    height: 45,
    fontSize: 18,
    color: "#000",
  },
  searchIcon: {
    color: "#F6B100",
    marginRight: 10,
  },
});

export default Header;
