import { CuisineStyle, MealType } from '@prisma/client';
import { IReciperequest } from '../../interfaces/recipes/recipe-request.interface';
import { IRecipeResponse } from '../../interfaces/recipes/recipe-response.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { RecipeMapper } from '../../mappers/recipe.mapper';
import { FindMealTypeByIdUseCase } from '../meal-type/find-meal-type-by-id.use-case';
import { FindIngredientByIdUseCase } from '../ingredient/find-ingredient-by-id.use-case';
import { FindCuisineStyleByIdUseCase } from '../cuisine-style/find-cuisine-style-by-id.use-case';
import { IIngredient } from '../../interfaces/ingredient/ingredient.interface';
import { DomainException } from '../../exceptions/domain.exception';

export class CreateRecipeUseCase {
  constructor(
    private recipeRepository: IRecipeRepository,
    private readonly findMealTypeByidUseCase: FindMealTypeByIdUseCase,
    private readonly findCuisineStyleByIdUseCase: FindCuisineStyleByIdUseCase,
    private readonly findIngredientByIdUseCase: FindIngredientByIdUseCase,
  ) {}

  async execute(recipe: IReciperequest): Promise<IRecipeResponse> {
    await this.validateMealTypes(recipe.mealTypes);
    await this.validateCuisineStyles(recipe.cuisineStyles);
    await this.validateIngredients(recipe.ingredients);
    try {
      const recipeEntity = RecipeMapper.toEntity(recipe);
      const createdRecipe = await this.recipeRepository.create(recipeEntity);
      return RecipeMapper.toResponseMin(createdRecipe);
    } catch (error) {
      console.error(error);
      throw new DomainException('Error creating recipe');
    }
  }

  private async validateMealTypes(mealTypes: MealType[]): Promise<void> {
    await Promise.all(
      mealTypes.map((mealType) =>
        this.findMealTypeByidUseCase.execute(mealType.id),
      ),
    );
  }

  private async validateCuisineStyles(
    cuisineStyles: CuisineStyle[],
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
