export interface IRecipeProjection {
  id: string;
  name: string;
  imgUrl?: string;
  macronutrients?: Record<string, number>;
  preparationTime?: number;
  servingCount?: number;
  viewCount: number;
  favoriteCount: number;
  costEstimate?: number;
  version: number;
  isFavorite?: boolean;
  user: { name: string };
}
