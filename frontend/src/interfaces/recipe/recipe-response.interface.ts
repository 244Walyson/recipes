import { IIngredient } from "../ingredient/ingredient.interface";
import { IMealType } from "../meal-type/meal-type.interface";
import { ICuisineStyle } from "../cuisine-style/cousine-styles.interface";
import { IDirections } from "./directions.interface";

export interface IRecipeResponse {
  id: string;
  name: string;
  preparationMethod: IDirections[];
  preparationTime: number;
  imgUrl?: string;
  difficultyLevel?: string;
  calories?: number;
  macronutrients?: Record<string, number>;
  allergens?: string[];
  servingCount?: number;
  viewCount: number;
  favoriteCount: number;
  averageRating?: number;
  costEstimate?: number;
  additionalTips?: string;
  isPublished: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  isFavorite?: boolean;
  isViewed?: boolean;
  deleted: boolean;
  user: { id: string; name: string; imgUrl: string; numberOfRecipes: number };
  recipeIngredients?: IIngredient[];
  mealTypes?: IMealType[];
  cuisineStyles?: ICuisineStyle[];
}
