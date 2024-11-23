import { useTheme } from "@/src/context/theme-context";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type MealTypeCardProps = {
  name: string;
  onDelete?: () => void;
};

const MealTypeCard = ({ name, onDelete }: MealTypeCardProps) => {
  const { theme } = useTheme();
  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).text}>{name}</Text>
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.tertiary,
      borderRadius: 16,
      paddingHorizontal: 15,
      paddingVertical: 5,
      alignSelf: "flex-start",
    },
    text: {
      fontSize: 16,
      color: theme.tertiary,
      textAlign: "center",
    },
  });

export default MealTypeCard;
