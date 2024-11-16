import { ICuisineStyle } from '../cuisine-style/cousine-styles.interface';
import { IIngredient } from '../ingredient/ingredient.interface';
import { IMealType } from '../meal-type/meal-type.interface';

export interface IRecipeResponse {
  id: string;
  name: string;
  preparationMethod: { step: number; title: string; description: string }[];
  preparationTime: number;
  imgUrl: string;
  macronutrients: Record<string, number>;
  allergens: string[];
  servingCount: number;
  viewCount: number;
  favoriteCount: number;
  averageRating: number;
  costEstimate: number;
  additionalTips: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  recipeIngredients?: IIngredient[];
  mealTypes?: IMealType[];
  cuisineStyles?: ICuisineStyle[];
  user?: {
    id: string;
    name: string;
    imgUrl: string;
  };
}
