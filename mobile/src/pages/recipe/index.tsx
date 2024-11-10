import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  ScrollView,
} from "react-native";
import HeaderSecondary from "@/src/components/shared/header-secondary";
import { useTheme } from "@/src/context/theme-context";
import InversePrimaryButton from "@/src/components/shared/inverse-primary-button";
import PrimaryButton from "@/src/components/shared/primary-button";
import AuthorCard from "@/src/components/recipe/author-card";
import { styles } from "./styles";
import RecipeInstructions from "@/src/components/recipe/recipe-instructions";
import IngredintsCard from "@/src/components/ingredients-card";

type InstructionStep = {
  step: number;
  title: string;
  description: string;
};

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
      "• In a recipient, combine garlic, ginger, and spices to make a thick paste.\n• In a recipient, combine garlic, ginger, and spices to make a thick paste.",
  },
  {
    step: 6,
    title: "Cook the chicken",
    description:
      "• Place the chicken in a pan with the spice paste and cook on medium heat until tender. \n• Place the chicken in a pan with the spice paste and cook on medium heat until tender.",
  },
];

const Recipe = () => {
  const [focusedBtn, setFocusedBtn] = React.useState("ingredients");
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("../../assets/food.png")}
        style={styles(theme).image}
      >
        <HeaderSecondary
          title="Receita"
          ioniconLeftName="arrow-left"
          ioniconRightName="cards-heart-outline"
          onPressLeft={() => {}}
          onPressRight={() => {}}
          colorEmphasis="#fff"
        />
      </ImageBackground>
      <View style={styles(theme).recipeContainer}>
        <View style={styles(theme).leftAlign}>
          <Text style={styles(theme).textTitle}>Hamburguer do chefe</Text>
          <View style={styles(theme).textWrapper}>
            <Text style={styles(theme).textType}>Sobremesa</Text>
            <Text style={styles(theme).textType}>1h 20min</Text>
          </View>
        </View>

        <AuthorCard />

        <View style={styles(theme).btnWrapper}>
          {focusedBtn === "ingredients" ? (
            <>
              <PrimaryButton
                text="ingredientes"
                onPress={() => setFocusedBtn("ingredients")}
              />
              <InversePrimaryButton
                text="Modo de preparo"
                onPress={() => setFocusedBtn("modo de preparo")}
              />
            </>
          ) : (
            <>
              <InversePrimaryButton
                text="ingredientes"
                onPress={() => setFocusedBtn("ingredients")}
              />
              <PrimaryButton
                text="Modo de preparo"
                onPress={() => setFocusedBtn("modo de preparo")}
              />
            </>
          )}
        </View>
        <ScrollView style={styles(theme).instructionsContainer}>
          {focusedBtn != "ingredients" ? (
            <RecipeInstructions data={instructions} />
          ) : (
            <IngredintsCard name="fruta" unity="ml" quantity={100} />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Recipe;
