import { ICuisineStyle } from '../../interfaces/cuisine-style/cousine-styles.interface';
import { ICuisineStyleRepository } from '../../interfaces/repositories/cuisine-style.repository';

export class CreateCuisineStyleUseCase {
  constructor(private cuisineStyleRepository: ICuisineStyleRepository) {}

  async execute(dto: ICuisineStyle): Promise<ICuisineStyle> {
    return await this.cuisineStyleRepository.create(dto);
  }
}
