import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AvatarCard from "./shared/avatar";

const TrendinCard = () => {
  return (
    <View style={styles.trendingContainer}>
      <Image source={require("../assets/food.png")} style={styles.image} />
      <View style={styles.textWrapper}>
        <Text style={styles.timeText}>1h 20min</Text>
        <Ionicons name="heart-outline" size={30} color="#ccc" />
      </View>
      <View style={styles.textDescWrapper}>
        <Text style={[styles.textTitle]}>Hamburguer do chefe</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  trendingContainer: {
    width: 235,
    height: 200,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  textWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#ccc",
  },
  textTitle: {
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  textDescWrapper: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  image: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
    marginBottom: 10,
  },
});

export default TrendinCard;
