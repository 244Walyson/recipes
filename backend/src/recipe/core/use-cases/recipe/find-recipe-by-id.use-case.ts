import { IRecipeResponse } from '../../interfaces/recipes/recipe-response.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { RecipeMapper } from '../../mappers/recipe.mapper';

export class FindRecipeByIdUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(id: string): Promise<IRecipeResponse> {
    const recipe = await this.recipeRepository.findbyId(id);
    return RecipeMapper.toResponse(recipe);
  }
}
