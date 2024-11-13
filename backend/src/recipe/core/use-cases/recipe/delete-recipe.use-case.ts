import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { DomainException } from '../../exceptions/domain.exception';

export class DeleteRecipeUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.recipeRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw new DomainException('Error deleting recipe');
    }
  }
}
