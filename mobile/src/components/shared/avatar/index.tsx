import React from "react";
import { Image, StyleSheet } from "react-native";

const Avatar = () => {
  return (
    <Image source={require("../../../assets/food.png")} style={styles.image} />
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 35,
    width: 70,
    height: 70,
  },
});

export default Avatar;
