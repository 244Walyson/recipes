export interface IIngredient {
  id: string;
  name: string;
  quantity?: number;
  unit?: string;
  recipeId?: string;
}
