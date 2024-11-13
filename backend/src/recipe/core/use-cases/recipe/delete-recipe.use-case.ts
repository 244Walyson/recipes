import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';

export class DeleteRecipeUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(id: string): Promise<void> {
    await this.recipeRepository.delete(id);
  }
}
