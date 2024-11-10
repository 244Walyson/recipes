import IngredintsCard from "@/src/components/ingredients-card";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomPicker from "@/src/components/custom-picker";
import HeaderSecondary from "@/src/components/shared/header-secondary";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import PrimaryButton from "@/src/components/shared/primary-button";
import InversePrimaryButton from "@/src/components/shared/inverse-primary-button";
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
