import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import PrimaryButton from "../../shared/primary-button";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import CustomInput from "../../shared/custom-input";
import {
  hasAnyInvalid,
  toDirtyAll,
  update,
  updateAndValidate,
  validateAll,
} from "@/src/utils/forms";
import {
  createRecipe,
  getRecipeById,
  updateRecipe,
} from "@/src/services/recipe.service";
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
import { useFocusEffect, useRouter } from "expo-router";
import { IRecipeResponse } from "@/src/interfaces/recipe/recipe-response.interface";
import { useRecipeRequestContext } from "@/src/context/recipe-request-context";
import GenericRecipeForm from "../generic-form";

type Macronnutrients = {
  carbs: number;
  protein: number;
  fat: number;
};

type RecipeFormProps = {
  imgUrl?: string;
  recipeId?: string;
};

const RecipeForm = ({ recipeId }: RecipeFormProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const { recipeRequest, updateRecipeRequest, resetRecipeRequest } =
    useRecipeRequestContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSaveRecipe = async () => {
    console.log("recipeRequest", recipeRequest);
    const data = await getRecipeDataFormated();
    console.log("data", data);
    if (!data) return;
    if (recipeId) {
      updateExistingRecipe(recipeId, data);
      return;
    }
    createNewRecipe(data);
  };

  const getRecipeDataFormated = async () => {
    const userId = await getStoredUserID();
    if (!userId) {
      router.replace("/register");
      return;
    }
    const data: IReciperequest = {
      ...recipeRequest,
      macronutrients: recipeRequest.macronutrients
        ? {
            carbs: +recipeRequest.macronutrients.carbs,
            protein: +recipeRequest.macronutrients.protein,
            fat: +recipeRequest.macronutrients.fat,
          }
        : undefined,
      ingredients: recipeRequest.ingredients.map((ingredient) => {
        return {
          id: ingredient.id,
          name: ingredient.name,
          quantity: +(ingredient.quantity ?? 0),
          unit: ingredient.unit,
        };
      }),
      preparationTime: +recipeRequest.preparationTime,
      servingCount: recipeRequest.servingCount
        ? +recipeRequest.servingCount
        : undefined,
      costEstimate: +recipeRequest.costEstimate,
      allergens: Array.isArray(recipeRequest.allergens)
        ? recipeRequest.allergens
        : recipeRequest.allergens
        ? [recipeRequest.allergens]
        : [],
      userId: userId,
    };

    console.log("data to req", data);

    return data;
  };

  const updateExistingRecipe = async (
    recipeId: string,
    data: IReciperequest
  ) => {
    updateRecipe(recipeId, data)
      .then((response) => {
        console.log(response);
        router.push(`/recipes/${response.id}`);
        //resetRecipeRequest();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const createNewRecipe = async (data: IReciperequest) => {
    createRecipe(data)
      .then((response) => {
        console.log(response);
        router.push(`/recipes/${response.id}`);
        ///resetRecipeRequest();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log("recipeId", recipeId);
    if (recipeId) {
      getRecipeById(recipeId)
        .then((response: IRecipeResponse) => {
          updateRecipeRequestFromResponse(response);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, [recipeId]);

  const updateRecipeRequestFromResponse = (response: IRecipeResponse) => {
    const macronutrients: Macronnutrients = {
      carbs: response.macronutrients?.carbs ?? 0,
      protein: response.macronutrients?.protein ?? 0,
      fat: response.macronutrients?.fat ?? 0,
    };

    console.log("responsemarconutrients", macronutrients);
    const updatedRecipeRequest = {
      name: response.name,
      preparationMethod: response.preparationMethod,
      preparationTime: response.preparationTime,
      imgUrl: response.imgUrl,
      additionalTips: response.additionalTips,
      macronutrients: macronutrients,
      servingCount: response.servingCount || undefined,
      isPublished: response.isPublished,
      costEstimate: response.costEstimate,
      allergens: response.allergens,
      ingredients: response.recipeIngredients,
      mealTypes: response.mealTypes,
      cuisineStyles: response.cuisineStyles,
    };

    console.log("response", response);
    console.log("updatedRecipeRequest", updatedRecipeRequest);

    updateRecipeRequest(updatedRecipeRequest);
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       updateRecipeRequest({
  //         name: "",
  //         preparationMethod: [],
  //         preparationTime: 0,
  //         imgUrl: "",
  //         additionalTips: "",
  //         macronutrients: undefined,
  //         servingCount: undefined,
  //         isPublished: false,
  //         costEstimate: undefined,
  //         allergens: [],
  //         ingredients: [],
  //         mealTypes: [],
  //         cuisineStyles: [],
  //       });
  //     };
  //   }, [])
  // );

  return (
    <ScrollView contentContainerStyle={styles(theme).formContainer}>
      <GenericRecipeForm />

      <MealTypeForm />

      <MacronutrientsForm />

      <IngredisAddForm />

      <DirectionsForm />

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
