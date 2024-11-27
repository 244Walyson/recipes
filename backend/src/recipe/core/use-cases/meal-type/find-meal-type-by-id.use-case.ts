import { RecipeResourceNotFoundException } from '../../exceptions/resource-not-found.exception';
import { IMealType } from '../../interfaces/meal-type/meal-type.interface';
import { IMealTypeRepository } from '../../interfaces/repositories/meal-type.repository';

export class FindMealTypeByIdUseCase {
  constructor(private readonly mealTypeRepository: IMealTypeRepository) {}

  async execute(id: string): Promise<IMealType> {
    try {
      return await this.mealTypeRepository.findById(id);
    } catch {
      throw new RecipeResourceNotFoundException('Meal type not found');
    }
  }
}
