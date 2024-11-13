import { Ingredient } from './ingredient.entity';

export class RecipeIngredient {
  quantity: number;
  unit: string;
  recipeId: string;
  ingredientId: string;
  ingredient?: Ingredient;

  constructor(props: Partial<RecipeIngredient>) {
    Object.assign(this, props);
  }
}
