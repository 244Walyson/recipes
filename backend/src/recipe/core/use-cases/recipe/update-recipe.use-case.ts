import { RecipeResourceNotFoundException } from '../../exceptions/resource-not-found.exception';
import { IReciperequest } from '../../interfaces/recipes/recipe-request.interface';
import { IRecipeResponse } from '../../interfaces/recipes/recipe-response.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { RecipeMapper } from '../../mappers/recipe.mapper';

export class UpdateRecipeUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(id, dto: IReciperequest): Promise<IRecipeResponse> {
    try {
      await this.recipeRepository.findbyId(id);
      const recipe = RecipeMapper.toEntity(dto);
      const createdRecipe = await this.recipeRepository.update(id, recipe);
      return RecipeMapper.toResponseMin(createdRecipe);
    } catch {
      throw new RecipeResourceNotFoundException('Recipe not found');
    }
  }
}
