import { IIngredient } from '../../interfaces/ingredient/ingredient.interface';
import { IIngredientRepository } from '../../interfaces/repositories/ingredients.repository';

export class FindIngredientByNameUseCase {
  constructor(private ingredientRepository: IIngredientRepository) {}

  async execute(name: string): Promise<IIngredient> {
    const ingredient = await this.ingredientRepository.findByName(name);
    return {
      id: ingredient.id,
      name: ingredient.name,
    };
  }
}
