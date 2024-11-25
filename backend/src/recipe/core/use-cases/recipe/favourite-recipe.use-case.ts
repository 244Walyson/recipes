import { RecipeDomainException } from '../../exceptions/domain.exception';
import { RecipeInvalidFieldValueException } from '../../exceptions/invalid-field-value.exception';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { FindRecipeByIdUseCase } from './find-recipe-by-id.use-case';

export class FavouriteRecipeUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly findRecipeByIdUseCase: FindRecipeByIdUseCase,
  ) {}

  async execute(dto: { recipeId: string; userId: string }): Promise<void> {
    await this.validate(dto);
    await this.findRecipeByIdUseCase.execute(dto.recipeId);
    try {
      await this.recipeRepository.favouriteRecipe(dto.recipeId, dto.userId);
    } catch (error) {
      console.log(error);
      throw new RecipeDomainException('Error adding favorite recipe');
    }
  }

  private async validate(dto: {
    recipeId: string;
    userId: string;
  }): Promise<void> {
    const errorMessages: Record<string, string>[] = [];
    if (!dto.recipeId) {
      errorMessages.push({ recipeId: 'recipeId não pode ser vazio' });
    }
    if (!dto.userId) {
      errorMessages.push({ userId: 'userId não pode ser vazio' });
    }
    if (errorMessages.length) {
      throw new RecipeInvalidFieldValueException(errorMessages);
    }
  }
}
