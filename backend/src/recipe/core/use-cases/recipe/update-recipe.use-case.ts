import { RecipeDomainException } from '../../exceptions/domain.exception';
import { IReciperequest } from '../../interfaces/recipes/recipe-request.interface';
import { IRecipeResponse } from '../../interfaces/recipes/recipe-response.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { RecipeMapper } from '../../mappers/recipe.mapper';
import { RecipeValidator } from '../../validators/recipe.validator';
import { FindRecipeByIdUseCase } from './find-recipe-by-id.use-case';

export class UpdateRecipeUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly findRecipeByIdUseCase: FindRecipeByIdUseCase,
    private readonly recipeValidator: RecipeValidator,
  ) {}

  async execute(id, dto: IReciperequest): Promise<IRecipeResponse> {
    await this.findRecipeByIdUseCase.execute(id);
    await this.recipeValidator.validateMealTypes(dto.mealTypes);
    await this.recipeValidator.validateCuisineStyles(dto.cuisineStyles);
    await this.recipeValidator.validateIngredients(dto.ingredients);
    const recipe = RecipeMapper.toEntity(dto);
    console.log('Updating recipe', recipe);
    try {
      const createdRecipe = await this.recipeRepository.update(id, recipe);
      return createdRecipe;
    } catch (error) {
      console.log(error);
      throw new RecipeDomainException('Error updatind recipe: ' + id);
    }
  }
}
