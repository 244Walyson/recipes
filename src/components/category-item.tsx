import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const CategoryItem = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    setIsFocused((prev) => !prev);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, isFocused && styles.containerFocused]}
    >
      <Text style={[styles.text, isFocused && styles.textFocused]}>
        Category Item
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    alignItems: "center",
    marginHorizontal: 10,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "#ccc",
  },
  textFocused: {
    color: "#000",
  },
  containerFocused: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
});

export default CategoryItem;
