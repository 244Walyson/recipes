import { RecipeResourceNotFoundException } from '../../exceptions/resource-not-found.exception';
import { IRecipeResponse } from '../../interfaces/recipes/recipe-response.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';

export class FindRecipeByIdUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(id: string): Promise<IRecipeResponse> {
    try {
      const recipe = await this.recipeRepository.findbyId(id);
      return recipe;
    } catch {
      throw new RecipeResourceNotFoundException('Recipe not found');
    }
  }
}
