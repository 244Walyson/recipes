import { ResourceNotFoundException } from '../../exceptions/resource-not-found.exception';
import { IIngredient } from '../../interfaces/ingredient/ingredient.interface';
import { IIngredientRepository } from '../../interfaces/repositories/ingredients.repository';

export class FindIngredientByIdUseCase {
  constructor(private ingredientRepository: IIngredientRepository) {}

  async execute(id: string): Promise<IIngredient> {
    try {
      const ingredient = await this.ingredientRepository.findById(id);
      return {
        id: ingredient.id,
        name: ingredient.name,
      };
    } catch (error) {
      console.error(error);
      throw new ResourceNotFoundException('Meal type not found');
    }
  }
}
