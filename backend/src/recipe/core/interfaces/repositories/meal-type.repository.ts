import { MealType } from '../../entities/meal-type.entity';

export interface IMealTypeRepository {
  create(mealType: MealType): Promise<MealType>;
  findById(id: string): Promise<MealType>;
  findAll(): Promise<MealType[]>;
  findByName(name: string): Promise<MealType>;
}
