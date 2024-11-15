import { RecipeDomainException } from '../../exceptions/domain.exception';
import { IMealType } from '../../interfaces/meal-type/meal-type.interface';
import { IMealTypeRepository } from '../../interfaces/repositories/meal-type.repository';

export class CreateMealTypeUseCase {
  constructor(private mealTypeRepository: IMealTypeRepository) {}

  async execute(dto: IMealType): Promise<IMealType> {
    try {
      return await this.mealTypeRepository.create(dto);
    } catch {
      throw new RecipeDomainException('Error creating meal type');
    }
  }
}
