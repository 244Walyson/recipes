import { RecipeDomainException } from '../../exceptions/domain.exception';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { RecipeValidator } from '../../validators/recipe.validator';

export class FavouriteRecipeUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly recipeValidator: RecipeValidator,
  ) {}

  async execute(dto: { recipeId: string; userId: string }): Promise<void> {
    await this.recipeValidator.validate(dto);
    try {
      await this.recipeRepository.favouriteRecipe(dto.recipeId, dto.userId);
    } catch (error) {
      console.log(error);
      throw new RecipeDomainException('Error adding favorite recipe');
    }
  }
}
