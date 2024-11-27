import { IRecipeProjection } from '../../interfaces/recipes/recipe-response-projection.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { IPaginatedResponse } from '../../interfaces/shared/paginated-response.interface';

export class FindFavouritesByUserIdUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute({
    id,
    page,
    limit,
  }: {
    id: string;
    page: number;
    limit: number;
  }): Promise<IPaginatedResponse<IRecipeProjection>> {
    const offset = (page - 1) * limit;
    const numericLimit = parseInt(limit.toString(), 10);

    const recipes = await this.recipeRepository.findFavouritesByUserId({
      id,
      offset,
      limit: numericLimit,
    });

    return {
      data: recipes.data,
      total: recipes.total,
      page: page,
      limit: limit,
    };
  }
}
