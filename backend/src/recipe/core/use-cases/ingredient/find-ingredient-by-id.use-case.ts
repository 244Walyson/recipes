import { IIngredient } from '../../interfaces/ingredient/ingredient.interface';
import { IIngredientRepository } from '../../interfaces/repositories/ingredients.repository';

export class FindIngredientByIdUseCase {
  constructor(private ingredientRepository: IIngredientRepository) {}

  async execute(id: string): Promise<IIngredient> {
    console.log('FindIngredientByIdUseCase.execute', id);
    const ingredient = await this.ingredientRepository.findById(id);
    return {
      id: ingredient.id,
      name: ingredient.name,
    };
  }
}
