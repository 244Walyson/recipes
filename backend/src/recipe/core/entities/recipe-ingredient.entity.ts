// core/entities/recipe-ingredient.entity.ts
export class RecipeIngredient {
  quantity: number;
  unit: string;
  recipeId: string;
  ingredientId: string;

  constructor(props: Partial<RecipeIngredient>) {
    Object.assign(this, props);
  }
}
