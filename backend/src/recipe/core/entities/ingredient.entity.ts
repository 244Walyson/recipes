import { RecipeIngredient } from './recipe-ingredient.entity';

export class Ingredient {
  id: string;
  name: string;
  recipeIngredients?: RecipeIngredient[] = [];

  constructor(props: Partial<Ingredient>) {
    this.id = props.id ?? crypto.randomUUID();
    Object.assign(this, props);
  }
}
