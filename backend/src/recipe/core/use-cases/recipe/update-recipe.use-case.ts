import { IReciperequest } from '../../interfaces/recipes/recipe-request.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { RecipeMapper } from '../../mappers/recipe.mapper';

export class UpdateRecipeUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(id, dto: IReciperequest): Promise<any> {
    const recipe = RecipeMapper.toEntity(dto);
    return await this.recipeRepository.update(id, recipe);
  }
}
