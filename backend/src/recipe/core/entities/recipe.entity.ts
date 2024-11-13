import { Comment } from './comment.entity';
import { CuisineStyle } from './cousine-style.entity';
import { MealType } from './meal-type.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';

export class Recipe {
  id: string;
  name: string;
  preparationMethod: string;
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
  viewCount: number = 0;
  favoriteCount: number = 0;
  averageRating?: number;
  costEstimate?: number;
  experienceLevel?: string;
  additionalTips?: string;
  videoUrl?: string;
  sourceUrl?: string;
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
