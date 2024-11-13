import { CuisineStyle, MealType } from '@prisma/client';
import { IReciperequest } from '../../interfaces/recipes/recipe-request.interface';
import { IRecipeResponse } from '../../interfaces/recipes/recipe-response.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { RecipeMapper } from '../../mappers/recipe.mapper';
import { FindMealTypeByIdUseCase } from '../meal-type/find-cuisine-style-by-id.use-case';
import { FindIngredientByIdUseCase } from '../ingredient/find-ingredient-by-id.use-case';
import { FindCuisineStyleByIdUseCase } from '../cuisine-style/find-cuisine-style-by-id.use-case';
import { IIngredient } from '../../interfaces/ingredient/ingredient.interface';

export class CreateRecipeUseCase {
  constructor(
    private recipeRepository: IRecipeRepository,
    private readonly findMealTypeByidUseCase: FindMealTypeByIdUseCase,
    private readonly findCuisineStyleByIdUseCase: FindCuisineStyleByIdUseCase,
    private readonly findIngredientByIdUseCase: FindIngredientByIdUseCase,
  ) {}

  async execute(recipe: IReciperequest): Promise<IRecipeResponse> {
    this.validateMealType(recipe.mealTypes);
    this.validateCuisineStyle(recipe.cuisineStyles);
    this.validateIngredients(recipe.ingredients);
    const recipeEntity = RecipeMapper.toEntity(recipe);
    const createdRecipe = await this.recipeRepository.create(recipeEntity);
    return RecipeMapper.toResponse(createdRecipe);
  }

  private validateMealType = (mealTypes: MealType[]) => {
    mealTypes.forEach((mealType) => {
      this.findMealTypeByidUseCase.execute(mealType.id);
    });
  };

  private validateCuisineStyle = (cuisineStyles: CuisineStyle[]) => {
    cuisineStyles.forEach((cuisineStyle) => {
      this.findCuisineStyleByIdUseCase.execute(cuisineStyle.id);
    });
  };

  private validateIngredients = (ingredients: IIngredient[]) => {
    ingredients.forEach((ingredient) => {
      this.findIngredientByIdUseCase.execute(ingredient.id);
    });
  };
}
