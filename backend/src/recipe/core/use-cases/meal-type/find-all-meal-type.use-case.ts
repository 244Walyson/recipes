import { IMealType } from '../../interfaces/meal-type/meal-type.interface';
import { IMealTypeRepository } from '../../interfaces/repositories/meal-type.repository';
import { IPaginatedResponse } from '../../interfaces/shared/paginated-response.interface';

export class FindAllMealTypeUseCase {
  constructor(private readonly mealTypeRepository: IMealTypeRepository) {}

  async execute({
    name,
    page,
    limit,
  }: {
    name: string;
    page: number;
    limit: number;
  }): Promise<IPaginatedResponse<IMealType>> {
    const offset = (page - 1) * limit;
    const numericLimit = parseInt(limit.toString(), 10);

    const mealTypes = await this.mealTypeRepository.findAll({
      name,
      offset,
      limit: numericLimit,
    });

    return {
      data: mealTypes.data,
      page: page,
      limit: limit,
      total: mealTypes.total,
    };
  }
}
