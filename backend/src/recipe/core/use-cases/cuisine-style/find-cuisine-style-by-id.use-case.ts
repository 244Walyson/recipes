import { ResourceNotFoundException } from '../../exceptions/resource-not-found.exception';
import { ICuisineStyle } from '../../interfaces/cuisine-style/cousine-styles.interface';
import { ICuisineStyleRepository } from '../../interfaces/repositories/cuisine-style.repository';

export class FindCuisineStyleByIdUseCase {
  constructor(
    private readonly cuisineStyleRepository: ICuisineStyleRepository,
  ) {}

  async execute(id: string): Promise<ICuisineStyle> {
    try {
      return await this.cuisineStyleRepository.findById(id);
    } catch (error) {
      console.error(error);
      throw new ResourceNotFoundException('Meal type not found');
    }
  }
}
