import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// Define o tipo do passo
type InstructionStep = {
  step: number;
  title: string;
  description: string;
};

// Array de instruções como exemplo
const instructions: InstructionStep[] = [
  {
    step: 1,
    title: "Prepare the spice paste",
    description:
      "• In a recipient, combine garlic, ginger, and spices to make a thick paste.",
  },
  {
    step: 2,
    title: "Cook the chicken",
    description:
      "• Place the chicken in a pan with the spice paste and cook on medium heat until tender.",
  },
  {
    step: 3,
    title: "Prepare the spice paste",
    description:
      "• In a recipient, combine garlic, ginger, and spices to make a thick paste.",
  },
  {
    step: 4,
    title: "Cook the chicken",
    description:
      "• Place the chicken in a pan with the spice paste and cook on medium heat until tender.",
  },
  {
    step: 5,
    title: "Prepare the spice paste",
    description:
      "• In a recipient, combine garlic, ginger, and spices to make a thick paste.",
  },
  {
    step: 6,
    title: "Cook the chicken",
    description:
      "• Place the chicken in a pan with the spice paste and cook on medium heat until tender.",
  },
];

const RecipeInstructions = () => {
  return (
    <View style={styles.container}>
      {instructions.map((instruction) => (
        <View key={instruction.step} style={styles.stepContainer}>
          <Text style={styles.stepTitle}>
            {instruction.step}. {instruction.title}
          </Text>
          <Text style={styles.bulletPoint}>{instruction.description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  stepContainer: {
    marginBottom: 20,
    paddingBottom: 10,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 16,
    color: "#555",
    paddingLeft: 10,
  },
});

export default RecipeInstructions;
