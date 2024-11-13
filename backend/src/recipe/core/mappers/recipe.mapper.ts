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
      preparationTime: dto.preparationTime,
      imgUrl: dto.imgUrl,
      difficultyLevel: dto.difficultyLevel,
      category: dto.category,
      tags: dto.tags,
      calories: dto.calories,
      macronutrients: dto.macronutrients,
      servingSize: dto.servingSize,
      allergens: dto.allergens,
      cookTime: dto.cookTime,
      totalTime: dto.totalTime,
      servingCount: dto.servingCount,
      costEstimate: dto.costEstimate,
      experienceLevel: dto.experienceLevel,
      additionalTips: dto.additionalTips,
      videoUrl: dto.videoUrl,
      sourceUrl: dto.sourceUrl,
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

  private static addIngredients = (
    entity: Recipe,
    ingredients: IIngredient[],
  ) => {
    return ingredients.map((ingredient) => ({
      ingredientId: ingredient.id,
      recipeId: entity.id,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    }));
  };

  private static addMealTypes = (mealTypes: IMealType[]) => {
    return mealTypes.map((mealType) => ({
      id: mealType.id,
      name: mealType.name,
    }));
  };

  private static addCuisineStyles = (cuisineStyles: IMealType[]) => {
    return cuisineStyles.map((cuisineStyle) => ({
      id: cuisineStyle.id,
      name: cuisineStyle.name,
    }));
  };

  static toResponse(recipe: Recipe): IRecipeResponse {
    return {
      id: recipe.id,
      name: recipe.name,
      preparationMethod: recipe.preparationMethod,
      preparationTime: recipe.preparationTime,
      imgUrl: recipe.imgUrl,
      difficultyLevel: recipe.difficultyLevel,
      category: recipe.category,
      tags: recipe.tags,
      calories: recipe.calories,
      macronutrients: recipe.macronutrients,
      servingSize: recipe.servingSize,
      allergens: recipe.allergens,
      cookTime: recipe.cookTime,
      totalTime: recipe.totalTime,
      servingCount: recipe.servingCount,
      viewCount: recipe.viewCount,
      favoriteCount: recipe.favoriteCount,
      averageRating: recipe.averageRating,
      costEstimate: recipe.costEstimate,
      experienceLevel: recipe.experienceLevel,
      additionalTips: recipe.additionalTips,
      videoUrl: recipe.videoUrl,
      sourceUrl: recipe.sourceUrl,
      isPublished: recipe.isPublished,
      version: recipe.version,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
      deleted: recipe.deleted,
      userId: recipe.userId,
      comments: recipe.comments,
      recipeIngredients: [],
      mealTypes: recipe.mealTypes,
      cuisineStyles: recipe.cuisineStyles,
    };
  }
}
