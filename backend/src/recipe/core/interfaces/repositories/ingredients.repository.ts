import { Ingredient } from '../../entities/ingredient.entity';

export interface IIngredientRepository {
  create(ingredient: Ingredient): Promise<Ingredient>;
  findById(id: string): Promise<Ingredient>;
  findAll(): Promise<Ingredient[]>;
  findByName(name: string): Promise<Ingredient>;
}
