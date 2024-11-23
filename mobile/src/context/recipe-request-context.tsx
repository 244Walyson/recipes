import React, { createContext, useContext, useState } from "react";
import { IReciperequest } from "../interfaces/recipe/recipe-request.interface";

interface RecipeRequestContextType {
  recipeRequest: IReciperequest;
  updateRecipeRequest: (updatedFields: Partial<IReciperequest>) => void;
  resetRecipeRequest: () => void;
}

const RecipeRequestContext = createContext<
  RecipeRequestContextType | undefined
>(undefined);

const initialRecipeRequest: IReciperequest = {
  name: "",
  preparationMethod: [],
  preparationTime: 0,
  isPublished: false,
  costEstimate: 0,
  ingredients: [],
  mealTypes: [],
  cuisineStyles: [],
  userId: "",
  additionalTips: "",
  allergens: [],
  imgUrl: "",
  macronutrients: { carbs: 0, protein: 0, fat: 0 },
  servingCount: 0,
};

export const RecipeRequestProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipeRequest, setRecipeRequest] =
    useState<IReciperequest>(initialRecipeRequest);

  const resetRecipeRequest = () => {
    setRecipeRequest(initialRecipeRequest);
  };

  const updateRecipeRequest = (updatedFields: Partial<IReciperequest>) => {
    setRecipeRequest((prevState) => ({
      ...prevState,
      ...updatedFields,
    }));
  };

  return (
    <RecipeRequestContext.Provider
      value={{ recipeRequest, updateRecipeRequest, resetRecipeRequest }}
    >
      {children}
    </RecipeRequestContext.Provider>
  );
};

export const useRecipeRequestContext = (): RecipeRequestContextType => {
  const context = useContext(RecipeRequestContext);
  if (!context) {
    throw new Error(
      "useRecipeRequestContext must be used within a RecipeRequestProvider"
    );
  }
  return context;
};
