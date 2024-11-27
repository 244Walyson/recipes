import { IFindAllFilters } from '../../interfaces/recipes/find-all-filters.interface';
import { IPaginatedResponse } from '../../interfaces/shared/paginated-response.interface';
import { IRecipeProjection } from '../../interfaces/recipes/recipe-response-projection.interface';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';

export class FindAllRecipeUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(
    {
      page,
      limit,
    }: {
      page: number;
      limit: number;
    },
    filters?: IFindAllFilters,
    userId?: string,
  ): Promise<IPaginatedResponse<IRecipeProjection>> {
    const offset = (page - 1) * limit;
    const numericLimit = parseInt(limit.toString(), 10);

    const queryParams = this.parseQueryParams(filters);

    const recipes = await this.recipeRepository.findAll(
      { offset, limit: numericLimit },
      queryParams,
      userId,
    );
    return {
      data: recipes.data,
      total: recipes.total,
      page: page,
      limit: limit,
    };
  }

  private parseQueryParams(filters: IFindAllFilters): IFindAllFilters {
    console.log(filters);

    const timeArray = filters?.preparationTime
      ? filters?.preparationTime
          .toString()
          .split(',')
          .map((time) => +time)
      : undefined;

    const priceArray = filters?.price
      ? filters.price
          .toString()
          .split(',')
          .map((price) => +price)
      : undefined;

    const ingredientsArray = filters?.ingredients
      ? filters.ingredients
          .toString()
          .split(',')
          .map((ingredient) => ingredient.trim())
      : undefined;

    const mealTypesArray = filters?.mealTypes
      ? filters?.mealTypes
          .toString()
          .split(',')
          .map((mealType) => mealType.trim())
      : undefined;

    const allergensArray = filters?.allergens
      ? filters.allergens
          .toString()
          .split(',')
          .map((allergen) => allergen.trim())
      : undefined;

    return {
      ...filters,
      ingredients: ingredientsArray,
      allergens: allergensArray,
      preparationTime: timeArray,
      price: priceArray,
      mealTypes: mealTypesArray,
    };
  }
}
