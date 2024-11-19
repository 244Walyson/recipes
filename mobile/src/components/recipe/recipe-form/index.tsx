import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import PrimaryButton from "../../shared/primary-button";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import CustomInput from "../../shared/custom-input";
import {
  hasAnyInvalid,
  toDirtyAll,
  updateAndValidate,
  validateAll,
} from "@/src/utils/forms";
import { createRecipe } from "@/src/services/recipe.service";
import { FormField, genericInputs } from "@/src/static/register-form-inputs";
import { IIngredient } from "@/src/interfaces/ingredient/ingredient.interface";
import { getStoredUserID } from "@/src/services/user.service";
import IngredisAddForm from "../ingredients-add-form";
import DirectionsForm from "../directions-form";
import { IDirections } from "@/src/interfaces/recipe/directions.interface";
import MacronutrientsForm from "../macronutrients-form";
import MealTypeForm from "../meal-type-form";
import { IMealType } from "@/src/interfaces/meal-type/meal-type.interface";
import ErrorContainer from "../../shared/error-container";
import { IReciperequest } from "@/src/interfaces/recipe/recipe-request.interface";
import { useRouter } from "expo-router";

type Macronnutrients = {
  carbs: number;
  protein: number;
  fat: number;
};

type RecipeFormProps = {
  imgUrl?: string;
};

const RecipeForm = ({ imgUrl }: RecipeFormProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [directions, setDirections] = useState<IDirections[]>([]);
  const [macronutrients, setMacronutrients] = useState<Macronnutrients>();
  const [mealTypes, setMealTypes] = useState<IMealType[]>([]);
  const [error, setError] = useState(false);
  const [genericFormData, setGenericFormData] =
    useState<Record<string, FormField>>(genericInputs);

  const handleGenericInputChange = (value: string, fieldName: string) => {
    setGenericFormData(updateAndValidate(genericFormData, fieldName, value));
  };

  const handleSaveRecipe = async () => {
    const dirtyGeneric = toDirtyAll(genericFormData);
    const validatedGeneric = validateAll(dirtyGeneric);

    const hasError = hasAnyInvalid(validatedGeneric);
    console.log(hasError);

    if (hasError) return setError(true);

    setGenericFormData(validatedGeneric);

    const genericdata = {
      name: genericFormData.name.value,
      preparationTime: Number(genericFormData.preparationTime?.value) || 0,
      servingCount: Number(genericFormData.servingCount.value),
      adictionalTips: genericFormData.adictionalTips.value,
      allergens: Array.isArray(genericFormData.allergens?.value)
        ? genericFormData.allergens.value
        : [genericFormData.allergens?.value],
      costEstimate: Number(genericFormData.costEstimate.value),
    };

    const userId = await getStoredUserID();

    if (!userId) return;

    const data: IReciperequest = {
      imgUrl: imgUrl,
      ...genericdata,
      ingredients: ingredients,
      preparationMethod: directions,
      macronutrients: macronutrients,
      isPublished: true,
      mealTypes: mealTypes,
      cuisineStyles: [],
      userId: userId,
    };
    createRecipe(data)
      .then((response) => {
        console.log(response);
        router.push(`/recipes/${response.id}`);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles(theme).formContainer}>
      {Object.entries(genericFormData).map(([key, field]) => (
        <CustomInput
          key={field.name}
          label={field.placeholder}
          placeholder={field.placeholder}
          keyboardType={field.type}
          invalid={field.invalid === "true" && field.dirty === "true"}
          value={field.value}
          onChangeText={(text) => handleGenericInputChange(text, field.name)}
        />
      ))}

      <MealTypeForm
        onAddMealType={(mealTypes: IMealType[]) => setMealTypes(mealTypes)}
      />

      <MacronutrientsForm
        onMacronutrientsAdd={(macronutrients: Macronnutrients) =>
          setMacronutrients(macronutrients)
        }
      />

      <IngredisAddForm
        onAddIngredient={(ingredients) => setIngredients(ingredients)}
      />

      <DirectionsForm
        onDirectionsAdd={(directions: IDirections[]) =>
          setDirections(directions)
        }
      />

      {error && (
        <View style={styles(theme).errorContainer}>
          {ingredients.length === 0 && (
            <ErrorContainer error="Adicione ingredientes" />
          )}
          {mealTypes.length === 0 && (
            <ErrorContainer error="Adicione um tipo de refeição" />
          )}
          {directions.length === 0 && (
            <ErrorContainer error="Adicione o modo de preparo" />
          )}
        </View>
      )}

      <PrimaryButton
        text="Salvar Receita"
        onPress={handleSaveRecipe}
        loading={loading}
        isActive={!loading}
      />
    </ScrollView>
  );
};

export default RecipeForm;
