import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";

const SearchCard = () => {

  const {theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <Image
        source={require("../../../assets/food.png")}
        style={styles(theme).image}
      />
      <View style={styles(theme).descriptionContainer}>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).textTitle}>Hamburguer do chefe</Text>
        </View>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).textType}>Sobremesa</Text>
          <Text style={styles(theme).textType}>1h 20min</Text>
        </View>
        <Text style={styles(theme).textAuthor}>by Joao Doe</Text>
      </View>
    </View>
  );
};

export default SearchCard;
