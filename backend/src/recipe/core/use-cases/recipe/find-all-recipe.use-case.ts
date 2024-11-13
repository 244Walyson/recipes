import { IFindAllFilters } from '../../interfaces/recipes/find-all-filters.interface';
import { IPaginatedResponse } from '../../interfaces/shared/paginated-response.interface';
import { IRecipeProjection } from '../../interfaces/recipes/recipe-response-projection.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';

export class FindAllRecipeUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(
    {
      page,
      limit,
    }: {
      page: number;
      limit: number;
    },
    filters?: IFindAllFilters,
  ): Promise<IPaginatedResponse<IRecipeProjection>> {
    const offset = (page - 1) * limit;
    const numericLimit = parseInt(limit.toString(), 10);

    const recipes = await this.recipeRepository.findAll(
      { offset, limit: numericLimit },
      filters,
    );
    return {
      data: recipes.data,
      total: recipes.total,
      page: page,
      limit: limit,
    };
  }
}
