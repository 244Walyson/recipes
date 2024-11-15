import { useTheme } from "@/src/context/theme-context";
import React from "react";
import { TextInput, View, StyleSheet, TextInputProps } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";

const SearchBar = (props: TextInputProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).inputWrapper}>
      <Ionicons name="search" size={20} style={styles(theme).searchIcon} />
      <TextInput
        style={styles(theme).input}
        placeholder="Pesquisar"
        placeholderTextColor="#F6B100"
        {...props}
      />
    </View>
  );
};

export default SearchBar;
