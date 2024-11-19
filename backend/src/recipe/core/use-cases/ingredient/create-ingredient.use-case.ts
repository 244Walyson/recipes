import { error } from 'console';
import { RecipeDomainException } from '../../exceptions/domain.exception';
import { IIngredient } from '../../interfaces/ingredient/ingredient.interface';
import { IIngredientRepository } from '../../interfaces/repositories/ingredients.repository';
import { Ingredient } from '../../entities/ingredient.entity';

export class CreateIngredientUseCase {
  constructor(private readonly ingredientRepository: IIngredientRepository) {}

  async execute(dto: IIngredient): Promise<IIngredient> {
    const ingredient = new Ingredient(dto);
    try {
      console.log(dto);
      const createdIngredient =
        await this.ingredientRepository.create(ingredient);
      return {
        id: createdIngredient.id,
        name: createdIngredient.name,
      };
    } catch {
      console.log(error);
      throw new RecipeDomainException('Error creating ingredient');
    }
  }
}
