import { IReciperequest } from '../../interfaces/recipes/recipe-request.interface';
import { IRecipeResponse } from '../../interfaces/recipes/recipe-response.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { RecipeMapper } from '../../mappers/recipe.mapper';
import { RecipeDomainException } from '../../exceptions/domain.exception';
import { RecipeValidator } from '../../validators/recipe.validator';

export class CreateRecipeUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly recipeValidator: RecipeValidator,
  ) {}

  async execute(recipe: IReciperequest): Promise<IRecipeResponse> {
    console.log('Creating recipe', recipe);
    const recipeEntity = RecipeMapper.toEntity(recipe);
    await this.recipeValidator.validateMealTypes(recipe.mealTypes);
    await this.recipeValidator.validateCuisineStyles(recipe.cuisineStyles);
    await this.recipeValidator.validateIngredients(recipe.ingredients);
    try {
      const createdRecipe = await this.recipeRepository.create(recipeEntity);
      return createdRecipe;
    } catch (error) {
      console.log(error);
      throw new RecipeDomainException('Error creating recipe');
    }
  }
}
