import { useTheme } from "@/src/context/theme-context";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";

const TrendinCard = () => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).trendingContainer}>
      <Image
        source={require("../../../assets/food.png")}
        style={styles(theme).image}
      />
      <View style={styles(theme).textWrapper}>
        <Text style={styles(theme).timeText}>1h 20min</Text>
        <Ionicons name="heart-outline" size={30} color="#ccc" />
      </View>
      <View style={styles(theme).textDescWrapper}>
        <Text style={[styles(theme).textTitle]}>Hamburguer do chefe</Text>
      </View>
    </View>
  );
};

export default TrendinCard;
