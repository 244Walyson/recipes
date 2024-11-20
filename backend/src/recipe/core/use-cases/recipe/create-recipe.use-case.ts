import { IReciperequest } from '../../interfaces/recipes/recipe-request.interface';
import { IRecipeResponse } from '../../interfaces/recipes/recipe-response.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { RecipeMapper } from '../../mappers/recipe.mapper';
import { FindMealTypeByIdUseCase } from '../meal-type/find-meal-type-by-id.use-case';
import { FindIngredientByIdUseCase } from '../ingredient/find-ingredient-by-id.use-case';
import { FindCuisineStyleByIdUseCase } from '../cuisine-style/find-cuisine-style-by-id.use-case';
import { IIngredient } from '../../interfaces/ingredient/ingredient.interface';
import { RecipeDomainException } from '../../exceptions/domain.exception';
import { ICuisineStyle } from '../../interfaces/cuisine-style/cousine-styles.interface';
import { IMealType } from '../../interfaces/meal-type/meal-type.interface';

export class CreateRecipeUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly findMealTypeByidUseCase: FindMealTypeByIdUseCase,
    private readonly findCuisineStyleByIdUseCase: FindCuisineStyleByIdUseCase,
    private readonly findIngredientByIdUseCase: FindIngredientByIdUseCase,
  ) {}

  async execute(recipe: IReciperequest): Promise<IRecipeResponse> {
    const recipeEntity = RecipeMapper.toEntity(recipe);
    await this.validateMealTypes(recipe.mealTypes);
    await this.validateCuisineStyles(recipe.cuisineStyles);
    await this.validateIngredients(recipe.ingredients);
    try {
      const createdRecipe = await this.recipeRepository.create(recipeEntity);
      return createdRecipe;
    } catch (error) {
      console.log(error);
      throw new RecipeDomainException('Error creating recipe');
    }
  }

  private async validateMealTypes(mealTypes: IMealType[]): Promise<void> {
    await Promise.all(
      mealTypes.map((mealType) =>
        this.findMealTypeByidUseCase.execute(mealType.id),
      ),
    );
  }

  private async validateCuisineStyles(
    cuisineStyles: ICuisineStyle[],
  ): Promise<void> {
    await Promise.all(
      cuisineStyles.map((cuisineStyle) =>
        this.findCuisineStyleByIdUseCase.execute(cuisineStyle.id),
      ),
    );
  }

  private async validateIngredients(ingredients: IIngredient[]): Promise<void> {
    await Promise.all(
      ingredients.map((ingredient) =>
        this.findIngredientByIdUseCase.execute(ingredient.id),
      ),
    );
  }
}
