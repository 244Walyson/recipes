import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  ScrollView,
  Animated,
} from "react-native";
import HeaderSecondary from "@/src/components/shared/header-secondary";
import { useTheme } from "@/src/context/theme-context";
import PrimaryButton from "@/src/components/shared/primary-button";
import AuthorCard from "@/src/components/recipe/author-card";
import { styles } from "./styles";
import RecipeInstructions from "@/src/components/recipe/recipe-instructions";
import IngredintsCard from "@/src/components/recipe/ingredients-card";
import DescriptionContainer from "@/src/components/recipe/description-container";
import SvgImageAdd from "@/src/assets/icons/image_add";
import { IRecipeResponse } from "@/src/interfaces/recipe/recipe-response.interface";
import { getRecipeById } from "@/src/services/recipe.service";
import IngredientsCard from "@/src/components/recipe/ingredients-card";
import { IIngredient } from "@/src/interfaces/ingredient/ingredient.interface";

type InstructionStep = {
  step: number;
  title: string;
  description: string;
};

const H_MAX_HEIGHT = 280;
const H_MIN_HEIGHT = 60;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

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
  const [recipe, setRecipe] = React.useState<IRecipeResponse>();

  const scrollY = useRef(new Animated.Value(0)).current;

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [0, -H_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  useEffect(() => {
    getRecipeById("310e587c-62e1-4f70-a557-bb5c3e5143a5").then((response) => {
      setRecipe(response);
      console.log(response);
    });
  }, []);

  return (
    <View style={styles(theme).container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Animated.View
        style={[
          {
            transform: [{ translateY: imageTranslateY }],
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: H_MAX_HEIGHT,
            zIndex: 1,
          },
        ]}
      >
        <ImageBackground
          source={{ uri: recipe?.imgUrl }}
          style={[styles(theme).image, { height: H_MAX_HEIGHT }]}
        >
          <HeaderSecondary
            title="Nova receita"
            ioniconLeftName="arrow-left"
            ioniconRightName="check"
            colorEmphasis="#fff"
          />
        </ImageBackground>
      </Animated.View>

      <ScrollView
        style={[
          styles(theme).instructionsContainer,
          { paddingTop: H_MAX_HEIGHT + 20 },
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {recipe && (
          <DescriptionContainer
            title={recipe.name}
            time={recipe.totalTime?.toString()}
            likes={recipe.favoriteCount}
            mealType={
              recipe.mealTypes && recipe.mealTypes.length > 0
                ? recipe.mealTypes[0].name
                : undefined
            }
          />
        )}
        {/*recipe && <AuthorCard name={recipe.user.name} />*/}

        <View style={styles(theme).btnWrapper}>
          <PrimaryButton
            text="Ingredientes"
            onPress={() => setFocusedBtn("ingredients")}
            isActive={focusedBtn === "ingredients"}
          />
          <PrimaryButton
            text="modo de preparo"
            onPress={() => setFocusedBtn("modo de preparo")}
            isActive={focusedBtn != "ingredients"}
          />
        </View>
        <View style={{ marginBottom: H_MAX_HEIGHT + 130 }}>
          {focusedBtn !== "ingredients" ? (
            <RecipeInstructions data={recipe?.preparationMethod} />
          ) : (
            recipe &&
            recipe.recipeIngredients &&
            recipe?.recipeIngredients.map((ingredient: IIngredient) => (
              <IngredientsCard
                key={ingredient.id}
                name={ingredient.name}
                quantity={ingredient.quantity}
                unit={ingredient.unit}
                editing={false}
                onDelete={() => {}}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Recipe;
