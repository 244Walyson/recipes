import { IMealType } from '../../interfaces/meal-type/meal-type.interface';
import { IMealTypeRepository } from '../../interfaces/repositories/meal-type.repository';

export class FindMealTypeByNameUseCase {
  constructor(private mealTypeRepository: IMealTypeRepository) {}

  async execute(name: string): Promise<IMealType> {
    return this.mealTypeRepository.findByName(name);
  }
}
