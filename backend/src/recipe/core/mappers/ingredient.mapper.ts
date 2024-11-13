import { Ingredient } from '../entities/ingredient.entity';
import { IIngredient } from '../interfaces/ingredient/ingredient.interface';

export class IngredientMapper {
  static toEntity(ingredient: IIngredient): Ingredient {
    return new Ingredient({
      id: ingredient.id,
      name: ingredient.name,
    });
  }
}
