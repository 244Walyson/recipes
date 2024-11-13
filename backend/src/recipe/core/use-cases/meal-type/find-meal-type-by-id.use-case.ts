import { IMealType } from '../../interfaces/meal-type/meal-type.interface';
import { IMealTypeRepository } from '../../interfaces/repositories/meal-type.repository';

export class FindMealTypeByIdUseCase {
  constructor(private mealTypeRepository: IMealTypeRepository) {}

  async execute(id: string): Promise<IMealType> {
    return await this.mealTypeRepository.findById(id);
  }
}
