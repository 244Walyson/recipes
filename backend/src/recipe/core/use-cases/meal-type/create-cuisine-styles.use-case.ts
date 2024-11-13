import { IMealType } from '../../interfaces/meal-type/meal-type.interface';
import { IMealTypeRepository } from '../../interfaces/repositories/meal-type.repository';

export class CreateMealTypeUseCase {
  constructor(private mealTypeRepository: IMealTypeRepository) {}

  async execute(dto: IMealType): Promise<IMealType> {
    return await this.mealTypeRepository.create(dto);
  }
}
