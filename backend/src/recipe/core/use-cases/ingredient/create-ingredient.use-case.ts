import { DomainException } from '../../exceptions/domain.exception';
import { IIngredient } from '../../interfaces/ingredient/ingredient.interface';
import { IIngredientRepository } from '../../interfaces/repositories/ingredients.repository';

export class CreateIngredientUseCase {
  constructor(private ingredientRepository: IIngredientRepository) {}

  async execute(dto: IIngredient): Promise<IIngredient> {
    try {
      const ingredient = await this.ingredientRepository.create(dto);
      return {
        id: ingredient.id,
        name: ingredient.name,
      };
    } catch (error) {
      console.error(error);
      throw new DomainException('Error creating ingredient');
    }
  }
}
