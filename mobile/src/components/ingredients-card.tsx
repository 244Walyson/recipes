import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type CustomIngredientProps = {
  name: string;
  quantity: number;
  unity: string;
  editing?: boolean;
  onDelete?: () => void;
};

const IngredintsCard = ({
  name,
  quantity,
  unity,
  editing,
  onDelete,
}: CustomIngredientProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>• {name}</Text>
      <View style={styles.textWrapper}>
        <Text style={styles.quantityText}>
          {quantity} {unity}
        </Text>
        {editing && (
          <TouchableOpacity onPress={onDelete}>
            <MaterialIcons name="delete" size={24} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
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
  textWrapper: {
    flexDirection: "row",
    gap: 10,
  },
});

export default IngredintsCard;
