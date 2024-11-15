import { ICuisineStyle } from '../cuisine-style/cousine-styles.interface';
import { IIngredient } from '../ingredient/ingredient.interface';
import { IMealType } from '../meal-type/meal-type.interface';

export interface IReciperequest {
  name: string;
  preparationMethod: string;
  preparationTime: number;
  imgUrl?: string;
  difficultyLevel?: string;
  category?: string;
  tags?: string[];
  calories?: number;
  macronutrients?: { protein: number; carbs: number; fat: number };
  servingSize?: string;
  allergens?: string[];
  cookTime?: number;
  totalTime?: number;
  servingCount?: number;
  costEstimate?: number;
  experienceLevel?: string;
  additionalTips?: string;
  videoUrl?: string;
  sourceUrl?: string;
  isPublished: boolean;
  userId: string;
  ingredients: IIngredient[];
  mealTypes: IMealType[];
  cuisineStyles: ICuisineStyle[];
}
