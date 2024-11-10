import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AvatarCard from "./avatar";

const CategoryCard = () => {
  return (
    <View style={styles.trendingContainer}>
      <Image source={require("../assets/food.png")} style={styles.image} />
      <View style={styles.textDescWrapper}>
        <Text style={[styles.textTitle]}>Fondue</Text>
      </View>
      <View>
        <Text style={[styles.textTitle, styles.textAuthor]}>by</Text>

        <Text style={[styles.textTitle, styles.textAuthor]}>Joao doe</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.timeText}>1h 20min</Text>
        <Ionicons name="heart-outline" size={30} color="#ccc" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  trendingContainer: {
    width: 230,
    height: 200,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#BF926B",
    padding: 10,
  },
  textDescWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  timeText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#ccc",
  },
  textTitle: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  textAuthor: {
    color: "#ccc",
  },
  image: {
    borderRadius: 50,
    width: 100,
    height: 100,
    marginTop: -50,
    backgroundColor: "#fff",
  },
});

export default CategoryCard;
