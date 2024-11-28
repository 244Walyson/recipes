import { useTheme } from "@/src/context/theme-context";
import React from "react";
import { TextInput, View, TextInputProps } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";

interface CustomSearchBarProps extends TextInputProps {
  onSearch: (text: string) => void;
}

const CustomSearchBar = ({ onSearch, ...props }: CustomSearchBarProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).inputWrapper}>
      <Ionicons name="search" size={20} style={styles(theme).searchIcon} />
      <TextInput
        style={styles(theme).input}
        placeholder="Pesquisar"
        placeholderTextColor="#F6B100"
        onChangeText={onSearch}
        {...props}
      />
    </View>
  );
};

export default CustomSearchBar;
