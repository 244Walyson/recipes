export interface IRecipeProjection {
  id: string;
  name: string;
  imgUrl?: string;
  difficultyLevel?: string;
  tags?: string[];
  calories?: number;
  macronutrients?: Record<string, number>;
  totalTime?: number;
  servingCount?: number;
  viewCount: number;
  favoriteCount: number;
  costEstimate?: number;
  version: number;
  user: { name: string };
}
