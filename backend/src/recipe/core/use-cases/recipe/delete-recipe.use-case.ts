import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { RecipeDomainException } from '../../exceptions/domain.exception';

export class DeleteRecipeUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.recipeRepository.delete(id);
    } catch {
      throw new RecipeDomainException('Error deleting recipe');
    }
  }
}
