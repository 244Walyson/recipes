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
  category?: string;
  tags?: string[];
  calories?: number;
  macronutrients?: Record<string, number>;
  servingSize?: string;
  allergens?: string[];
  cookTime?: number;
  totalTime?: number;
  servingCount?: number;
  viewCount: number;
  favoriteCount: number;
  averageRating?: number;
  costEstimate?: number;
  experienceLevel?: string;
  additionalTips?: string;
  videoUrl?: string;
  sourceUrl?: string;
  isPublished: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  user: { id: string; name: string };
  recipeIngredients?: IIngredient[];
  mealTypes?: IMealType[];
  cuisineStyles?: ICuisineStyle[];
}
