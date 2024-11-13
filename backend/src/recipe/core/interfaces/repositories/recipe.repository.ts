import { Recipe } from '../../entities/recipe.entity';
import { IFindAllFilters } from '../recipes/find-all-filters.interface';
import { IRecipeProjection } from '../recipes/recipe-response-projection.interface';

export interface IRecipeRepository {
  create(recipe: Recipe): Promise<Recipe>;
  findbyId(recipeId: string): Promise<Recipe>;
  findAll(
    {
      offset,
      limit,
    }: {
      offset: number;
      limit: number;
    },
    filters: IFindAllFilters,
  ): Promise<{ total: number; data: IRecipeProjection[] }>;
  update(id: string, recipe: Recipe): Promise<Recipe>;
  delete(recipeId: string): Promise<void>;
}
