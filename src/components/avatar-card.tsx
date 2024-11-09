import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const AvatarCard = () => {
  return (
    <View style={styles.authorContainer}>
      <Image
        source={require("../assets/food.png")}
        style={styles.imageAvatar}
      />
      <Text style={styles.textAuthor}>Jhon Doe</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textAuthor: {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  image: {
    borderRadius: 20,
    width: "100%",
    height: "80%",
    marginBottom: 10,
  },
  imageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  authorContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
});

export default AvatarCard;
