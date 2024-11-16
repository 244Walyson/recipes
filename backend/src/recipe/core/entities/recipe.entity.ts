import { Comment } from './comment.entity';
import { CuisineStyle } from './cousine-style.entity';
import { MealType } from './meal-type.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';

export class Recipe {
  id: string;
  name: string;
  preparationMethod: {
    step: number;
    title: string;
    description: string;
  }[];
  preparationTime: number;
  imgUrl?: string;
  macronutrients?: Record<string, number>;
  allergens?: string[];
  servingCount?: number;
  viewCount: number = 0;
  favoriteCount: number = 0;
  averageRating?: number;
  costEstimate?: number;
  additionalTips?: string;
  isPublished: boolean = true;
  version: number = 1;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  deleted: boolean = false;
  userId: string;
  comments?: Comment[] = [];
  recipeIngredients?: RecipeIngredient[] = [];
  mealTypes?: MealType[] = [];
  cuisineStyles?: CuisineStyle[] = [];

  constructor(props: Partial<Recipe>) {
    this.id = props.id ?? crypto.randomUUID();
    Object.assign(this, props);
  }
}
