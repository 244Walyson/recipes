import { MealType } from '../entities/meal-type.entity';
import { IMealType } from '../interfaces/meal-type/meal-type.interface';

export class MealTypeMapper {
  static toEntity(mealType: IMealType): MealType {
    return new MealType({
      id: mealType.id,
      name: mealType.name,
    });
  }
}
