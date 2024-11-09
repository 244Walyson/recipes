import React from "react";
import { View, Text, StyleSheet } from "react-native";

const IngredintsCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>• Ingrediente</Text>
      <Text style={styles.quantityText}>100 mls</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ccc",
  },
  quantityText: {
    fontSize: 20,
    color: "#ccc",
  },
});

export default IngredintsCard;
