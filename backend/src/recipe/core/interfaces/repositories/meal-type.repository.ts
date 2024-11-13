import { MealType } from '../../entities/meal-type.entity';

export interface IMealTypeRepository {
  create(mealType: MealType): Promise<MealType>;
  findById(id: string): Promise<MealType>;
  findAll({
    name,
    offset,
    limit,
  }: {
    name: string;
    limit: number;
    offset: number;
  }): Promise<{ total: number; data: MealType[] }>;
  findByName(name: string): Promise<MealType>;
}
