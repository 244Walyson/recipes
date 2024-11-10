import React from "react";
import { Image, View, StyleSheet } from "react-native";

type RecipeCardProps = {
  imgUrl: string;
};

const RecipeCard = ({ imgUrl }: RecipeCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={require("../assets/pancake.png")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginBottom: 10,
    borderRadius: 20,
    overflow: "hidden",
    width: 150,
    height: 150,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "#BF926B",
  },
});

export default RecipeCard;
