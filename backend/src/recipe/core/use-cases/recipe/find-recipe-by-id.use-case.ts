import { RecipeResourceNotFoundException } from '../../exceptions/resource-not-found.exception';
import { IRecipeResponse } from '../../interfaces/recipes/recipe-response.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';

export class FindRecipeByIdUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(recipeId: string, userId?: string): Promise<IRecipeResponse> {
    try {
      const recipe = await this.recipeRepository.findbyId(recipeId, userId);
      return recipe;
    } catch {
      throw new RecipeResourceNotFoundException('Recipe not found');
    }
  }
}
