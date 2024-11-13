import { ICuisineStyle } from '../../interfaces/cuisine-style/cousine-styles.interface';
import { ICuisineStyleRepository } from '../../interfaces/repositories/cuisine-style.repository';

export class FindCuisineStyleByIdUseCase {
  constructor(
    private readonly cuisineStyleRepository: ICuisineStyleRepository,
  ) {}

  async execute(id: string): Promise<ICuisineStyle> {
    return await this.cuisineStyleRepository.findById(id);
  }
}
