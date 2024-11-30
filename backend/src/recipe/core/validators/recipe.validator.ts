import { RecipeDomainException } from '../exceptions/domain.exception';
import { RecipeInvalidFieldValueException } from '../exceptions/invalid-field-value.exception';
import { ICuisineStyle } from '../interfaces/cuisine-style/cousine-styles.interface';
import { IIngredient } from '../interfaces/ingredient/ingredient.interface';
import { IMealType } from '../interfaces/meal-type/meal-type.interface';
import { FindCuisineStyleByIdUseCase } from '../use-cases/cuisine-style/find-cuisine-style-by-id.use-case';
import { FindIngredientByIdUseCase } from '../use-cases/ingredient/find-ingredient-by-id.use-case';
import { FindMealTypeByIdUseCase } from '../use-cases/meal-type/find-meal-type-by-id.use-case';

export class RecipeValidator {
  constructor(
    private readonly findMealTypeByidUseCase: FindMealTypeByIdUseCase,
    private readonly findCuisineStyleByIdUseCase: FindCuisineStyleByIdUseCase,
    private readonly findIngredientByIdUseCase: FindIngredientByIdUseCase,
  ) {}

  async validateMealTypes(mealTypes: IMealType[]): Promise<void> {
    if (mealTypes) {
      try {
        await Promise.all(
          mealTypes.map((mealType) =>
            this.findMealTypeByidUseCase.execute(mealType.id),
          ),
        );
      } catch (error) {
        console.error('Error validating ingredients:', error);
        throw new RecipeDomainException('One or more meal type not found');
      }
    }
  }

  async validateCuisineStyles(cuisineStyles: ICuisineStyle[]): Promise<void> {
    if (cuisineStyles) {
      try {
        await Promise.all(
          cuisineStyles.map((cuisineStyle) =>
            this.findCuisineStyleByIdUseCase.execute(cuisineStyle.id),
          ),
        );
      } catch (error) {
        console.error('Error validating ingredients:', error);
        throw new RecipeDomainException('One or more cuisine style not found');
      }
    }
  }

  async validateIngredients(ingredients: IIngredient[]): Promise<void> {
    if (ingredients) {
      try {
        await Promise.all(
          ingredients.map((ingredient) =>
            this.findIngredientByIdUseCase.execute(ingredient.id),
          ),
        );
      } catch (error) {
        console.error('Error validating ingredients:', error);
        throw new RecipeDomainException('One or more ingredients not found');
      }
    }
  }

  async validate(dto: { recipeId: string; userId: string }): Promise<void> {
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
