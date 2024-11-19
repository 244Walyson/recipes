import { ICuisineStyle } from "../cuisine-style/cousine-styles.interface";
import { IIngredient } from "../ingredient/ingredient.interface";
import { IMealType } from "../meal-type/meal-type.interface";

export interface IReciperequest {
  name: string;
  preparationMethod: {
    step: number;
    title: string;
    description: string;
  }[];
  preparationTime: number;
  imgUrl?: string;
  macronutrients?: { protein: number; carbs: number; fat: number };
  servingCount?: number;
  isPublished: boolean;
  costEstimate: number;
  allergens?: string[];
  ingredients: IIngredient[];
  mealTypes: IMealType[];
  cuisineStyles: ICuisineStyle[];
  userId: string;
}
