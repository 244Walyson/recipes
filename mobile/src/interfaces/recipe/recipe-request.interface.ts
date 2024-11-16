import { ICuisineStyle } from "../cuisine-style/cousine-styles.interface";
import { IIngredient } from "../ingredient/ingredient.interface";
import { IMealType } from "../meal-type/meal-type.interface";

type Directions = {
  step: number;
  title: string;
  description: string;
};

type Macronutrients = { protein: number; carbs: number; fat: number };

export interface IReciperequest {
  name: string;
  preparationMethod: Directions[];
  preparationTime: number;
  imgUrl?: string;
  macronutrients?: Macronutrients;
  servingCount?: number;
  isPublished: boolean;
  costEstimate: number;
  allergens?: string[];
  ingredients: IIngredient[];
  mealTypes: IMealType[];
  cuisineStyles: ICuisineStyle[];
}
