import { RecipeIngredient } from './recipe-ingredient.entity';

export class Ingredient {
  public id: string;
  public name: string;
  public recipeIngredients: RecipeIngredient[] = [];
}
