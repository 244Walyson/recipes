import { IFindAllFilters } from '../../interfaces/recipes/find-all-filters.interface';
import { IPaginatedResponse } from '../../interfaces/shared/paginated-response.interface';
import { IRecipeProjection } from '../../interfaces/recipes/recipe-response-projection.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';

export class FindAllRecipeUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(
    pageable: { page: number; limit: number },
    filters?: IFindAllFilters,
  ): Promise<IPaginatedResponse<IRecipeProjection>> {
    const recipes = await this.recipeRepository.findAll(pageable, filters);
    return {
      data: recipes.data,
      total: recipes.total,
      page: pageable.page,
      limit: pageable.limit,
    };
  }
}
