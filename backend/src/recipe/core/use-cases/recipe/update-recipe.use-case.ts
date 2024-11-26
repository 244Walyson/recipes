import { RecipeDomainException } from '../../exceptions/domain.exception';
import { ICuisineStyle } from '../../interfaces/cuisine-style/cousine-styles.interface';
import { IIngredient } from '../../interfaces/ingredient/ingredient.interface';
import { IMealType } from '../../interfaces/meal-type/meal-type.interface';
import { IReciperequest } from '../../interfaces/recipes/recipe-request.interface';
import { IRecipeResponse } from '../../interfaces/recipes/recipe-response.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { RecipeMapper } from '../../mappers/recipe.mapper';
import { FindCuisineStyleByIdUseCase } from '../cuisine-style/find-cuisine-style-by-id.use-case';
import { FindIngredientByIdUseCase } from '../ingredient/find-ingredient-by-id.use-case';
import { FindMealTypeByIdUseCase } from '../meal-type/find-meal-type-by-id.use-case';
import { FindRecipeByIdUseCase } from './find-recipe-by-id.use-case';

export class UpdateRecipeUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly findRecipeByIdUseCase: FindRecipeByIdUseCase,
    private readonly findMealTypeByidUseCase: FindMealTypeByIdUseCase,
    private readonly findCuisineStyleByIdUseCase: FindCuisineStyleByIdUseCase,
    private readonly findIngredientByIdUseCase: FindIngredientByIdUseCase,
  ) {}

  async execute(id, dto: IReciperequest): Promise<IRecipeResponse> {
    await this.findRecipeByIdUseCase.execute(id);
    this.validateMealTypes(dto.mealTypes);
    this.validateCuisineStyles(dto.cuisineStyles);
    this.validateIngredients(dto.ingredients);
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
