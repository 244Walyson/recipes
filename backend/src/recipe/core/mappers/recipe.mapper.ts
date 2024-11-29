import { CuisineStyle } from '../entities/cuisine-style.entity';
import { MealType } from '../entities/meal-type.entity';
import { RecipeIngredient } from '../entities/recipe-ingredient.entity';
import { Recipe } from '../entities/recipe.entity';
import { IIngredient } from '../interfaces/ingredient/ingredient.interface';
import { IMealType } from '../interfaces/meal-type/meal-type.interface';
import { IReciperequest } from '../interfaces/recipes/recipe-request.interface';
import { IRecipeResponse } from '../interfaces/recipes/recipe-response.interface';

export class RecipeMapper {
  static toEntity(dto: IReciperequest): Recipe {
    const recipe = new Recipe({
      name: dto.name,
      preparationMethod: dto.preparationMethod,
      preparationTime: +dto.preparationTime,
      imgUrl: dto.imgUrl,
      macronutrients: dto.macronutrients,
      allergens: dto.allergens,
      servingCount: +dto.servingCount,
      costEstimate: +dto.costEstimate,
      additionalTips: dto.additionalTips,
      isPublished: dto.isPublished,
      userId: dto.userId,
      comments: [],
      recipeIngredients: [],
      mealTypes: [],
      cuisineStyles: [],
    });

    recipe.recipeIngredients = this.addIngredients(recipe, dto.ingredients);
    recipe.mealTypes = this.addMealTypes(dto.mealTypes);
    recipe.cuisineStyles = this.addCuisineStyles(dto.cuisineStyles);

    return recipe;
  }

  private static readonly addIngredients = (
    entity: Recipe,
    ingredients: IIngredient[],
  ): RecipeIngredient[] => {
    return ingredients.map((ingredient) => ({
      ingredientId: ingredient.id,
      recipeId: entity.id,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    }));
  };

  private static readonly addMealTypes = (mealTypes: IMealType[]) => {
    return mealTypes.map((mealType) => new MealType(mealType));
  };

  private static readonly addCuisineStyles = (cuisineStyles: IMealType[]) => {
    return cuisineStyles.map((cuisineStyle) => new CuisineStyle(cuisineStyle));
  };

  static toResponseMin(recipe: Recipe): IRecipeResponse {
    return {
      id: recipe.id,
      name: recipe.name,
      preparationMethod: recipe.preparationMethod,
      preparationTime: recipe.preparationTime,
      imgUrl: recipe.imgUrl,
      macronutrients: recipe.macronutrients,
      allergens: recipe.allergens,
      servingCount: recipe.servingCount,
      viewCount: recipe.viewCount,
      favoriteCount: recipe.favoriteCount,
      averageRating: recipe.averageRating,
      costEstimate: recipe.costEstimate,
      additionalTips: recipe.additionalTips,
      version: recipe.version,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    };
  }

  static toResponse(recipe: Recipe): IRecipeResponse {
    const data = this.toResponseMin(recipe);
    return {
      ...data,
      recipeIngredients: recipe.recipeIngredients.map((ingredient) => ({
        id: ingredient.ingredientId,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        name: ingredient.ingredient?.name,
      })),
      mealTypes: recipe.mealTypes,
      cuisineStyles: recipe.cuisineStyles,
    };
  }
}
