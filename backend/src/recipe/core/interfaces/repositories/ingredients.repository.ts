import { Ingredient } from '../../entities/ingredient.entity';
import { IIngredient } from '../ingredient/ingredient.interface';

export interface IIngredientRepository {
  create(ingredient: Ingredient): Promise<IIngredient>;
  findById(id: string): Promise<IIngredient>;
  findAll({
    name,
    offset,
    limit,
  }: {
    name: string;
    offset: number;
    limit: number;
  }): Promise<{ total: number; data: IIngredient[] }>;
  findByName(name: string): Promise<IIngredient>;
}
