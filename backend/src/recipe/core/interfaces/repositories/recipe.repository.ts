import { Recipe } from '../../entities/recipe.entity';
import { IFindAllFilters } from '../recipes/find-all-filters.interface';
import { IRecipeProjection } from '../recipes/recipe-response-projection.interface';

export interface IRecipeRepository {
  create(recipe: Recipe): Promise<Recipe>;
  findbyId(recipeId: string): Promise<Recipe>;
  findAll(
    pageable: { page: number; limit: number },
    filters: IFindAllFilters,
  ): Promise<{ total: number; data: IRecipeProjection[] }>;
  update(recipe: Recipe): Promise<Recipe>;
  inactivate(recipeId: string): Promise<void>;
}
