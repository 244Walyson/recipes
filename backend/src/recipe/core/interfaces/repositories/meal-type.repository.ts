import { MealType } from '../../entities/meal-type.entity';
import { IMealType } from '../meal-type/meal-type.interface';

export interface IMealTypeRepository {
  create(mealType: MealType): Promise<IMealType>;
  findById(id: string): Promise<IMealType>;
  findAll({
    name,
    offset,
    limit,
  }: {
    name: string;
    limit: number;
    offset: number;
  }): Promise<{ total: number; data: IMealType[] }>;
  findByName(name: string): Promise<IMealType>;
}
