import { Recipe } from '../../entities/recipe.entity';
import { IFindAllFilters } from '../recipes/find-all-filters.interface';
import { IRecipeProjection } from '../recipes/recipe-response-projection.interface';
import { IRecipeResponse } from '../recipes/recipe-response.interface';

export interface IRecipeRepository {
  create(recipe: Recipe): Promise<IRecipeResponse>;
  findbyId(recipeId: string, userId?: string): Promise<IRecipeResponse>;
  findAll(
    {
      offset,
      limit,
    }: {
      offset: number;
      limit: number;
    },
    filters: IFindAllFilters,
    userId?: string,
  ): Promise<{ total: number; data: IRecipeProjection[] }>;
  findRecipesByUserId({
    id,
    offset,
    limit,
  }: {
    id: string;
    offset: number;
    limit: number;
  }): Promise<{ total: number; data: IRecipeProjection[] }>;
  update(id: string, recipe: Recipe): Promise<IRecipeResponse>;
  delete(recipeId: string): Promise<void>;
  favouriteRecipe(recipeId: string, userId: string): Promise<void>;
  unfavouriteRecipe(recipeId: string, userId: string): Promise<void>;
  addViewCount(recipeId: string, userId: string): Promise<void>;
}
