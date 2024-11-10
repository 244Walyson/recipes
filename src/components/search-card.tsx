import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

const SearchCard = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/food.png")} style={styles.image} />
      <View style={styles.descriptionContainer}>
        <View style={styles.textWrapper}>
          <Text style={styles.textTitle}>Hamburguer do chefe</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.textType}>Sobremesa</Text>
          <Text style={styles.textType}>1h 20min</Text>
        </View>
        <Text style={styles.textAuthor}>by Joao Doe</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 130,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textType: {
    fontSize: 18,
    color: "#ccc",
  },
  textAuthor: {
    fontSize: 18,
    color: "#ccc",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default SearchCard;
