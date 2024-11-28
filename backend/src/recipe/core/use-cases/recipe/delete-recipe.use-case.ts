import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { RecipeDomainException } from '../../exceptions/domain.exception';

export class DeleteRecipeUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(id: string): Promise<void> {
    console.log('DeleteRecipeUseCase.execute', id);
    try {
      await this.recipeRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw new RecipeDomainException('Error deleting recipe');
    }
  }
}
