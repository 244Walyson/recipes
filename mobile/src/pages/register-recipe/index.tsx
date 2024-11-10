import React, { useState } from "react";
import { View, ScrollView, StatusBar, ImageBackground } from "react-native";
import HeaderSecondary from "@/src/components/shared/header-secondary";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import RecipeForm from "@/src/components/recipe/recipe-form";

const RegisterRecipe = () => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles(theme).imagePlaceholder}>
        <ImageBackground
          source={require("../../assets/plate.png")}
          style={styles(theme).image}
        >
          <View style={styles(theme).overlay} />
          <HeaderSecondary
            title="Nova receita"
            ioniconLeftName="arrow-back"
            ioniconRightName="checkmark-outline"
          />
        </ImageBackground>
      </View>

      <ScrollView contentContainerStyle={styles(theme).formContainer}>
        <RecipeForm />
      </ScrollView>
    </View>
  );
};

export default RegisterRecipe;
