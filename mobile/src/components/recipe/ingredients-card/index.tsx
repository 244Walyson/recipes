import { useTheme } from "@/src/context/theme-context";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";

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
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).textTitle}>{name}</Text>
      <View style={styles(theme).textWrapper}>
        <Text style={styles(theme).quantityText}>
          {quantity} {unity}
        </Text>
        {editing && (
          <TouchableOpacity onPress={onDelete}>
            <MaterialIcons name="delete" size={24} color={theme.foreground} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default IngredintsCard;
