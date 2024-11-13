import { IIngredient } from '../../interfaces/ingredient/ingredient.interface';
import { IIngredientRepository } from '../../interfaces/repositories/ingredients.repository';
import { IPaginatedResponse } from '../../interfaces/shared/paginated-response.interface';

export class FindAllIngredientUseCase {
  constructor(private ingredientRepository: IIngredientRepository) {}

  async execute({
    name,
    page,
    limit,
  }: {
    name: string;
    page: number;
    limit: number;
  }): Promise<IPaginatedResponse<IIngredient>> {
    const offset = (page - 1) * limit;
    const numericLimit = parseInt(limit.toString(), 10);

    const ingredients = await this.ingredientRepository.findAll({
      name,
      offset,
      limit: numericLimit,
    });

    return {
      data: ingredients.data,
      page: page,
      limit: limit,
      total: ingredients.total,
    };
  }
}
