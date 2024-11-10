import React from "react";
import { TextInput, View, StyleSheet, TextInputProps } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchBar = (props: TextInputProps) => {
  return (
    <View style={styles.inputWrapper}>
      <Ionicons name="search" size={20} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder="Pesquisar"
        placeholderTextColor="#F6B100"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default SearchBar;
