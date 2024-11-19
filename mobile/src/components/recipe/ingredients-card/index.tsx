import { useTheme } from "@/src/context/theme-context";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";

type CustomIngredientProps = {
  name: string;
  quantity?: number;
  unit?: string;
  editing?: boolean;
  onDelete?: () => void;
};

const IngredintsCard = ({
  name,
  quantity,
  unit,
  editing,
  onDelete,
}: CustomIngredientProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).textTitle}>{name}</Text>
      <View style={styles(theme).textWrapper}>
        <Text style={styles(theme).quantityText}>
          {quantity} {unit}
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
