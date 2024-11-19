import { MealType } from '../../entities/meal-type.entity';
import { RecipeDomainException } from '../../exceptions/domain.exception';
import { IMealType } from '../../interfaces/meal-type/meal-type.interface';
import { IMealTypeRepository } from '../../interfaces/repositories/meal-type.repository';

export class CreateMealTypeUseCase {
  constructor(private readonly mealTypeRepository: IMealTypeRepository) {}

  async execute(dto: IMealType): Promise<IMealType> {
    const mealType = new MealType(dto);
    try {
      return await this.mealTypeRepository.create(mealType);
    } catch (error) {
      console.log(error);
      throw new RecipeDomainException('Error creating meal type');
    }
  }
}
