import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";

type InstructionStep = {
  step: number;
  title: string;
  description: string;
};

type InstructionProps = {
  data?: InstructionStep[];
};

const RecipeInstructions = ({ data }: InstructionProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      {data &&
        data.map((instruction) => (
          <View key={instruction.step} style={styles(theme).stepContainer}>
            <Text style={styles(theme).stepTitle}>
              {instruction.step}. {instruction.title}
            </Text>
            <Text style={styles(theme).bulletPoint}>
              {instruction.description}
            </Text>
          </View>
        ))}
    </View>
  );
};

export default RecipeInstructions;
