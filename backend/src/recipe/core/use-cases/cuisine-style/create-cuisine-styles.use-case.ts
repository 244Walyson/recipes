import { RecipeDomainException } from '../../exceptions/domain.exception';
import { ICuisineStyle } from '../../interfaces/cuisine-style/cousine-styles.interface';
import { ICuisineStyleRepository } from '../../interfaces/repositories/cuisine-style.repository';

export class CreateCuisineStyleUseCase {
  constructor(private cuisineStyleRepository: ICuisineStyleRepository) {}

  async execute(dto: ICuisineStyle): Promise<ICuisineStyle> {
    try {
      return await this.cuisineStyleRepository.create(dto);
    } catch {
      throw new RecipeDomainException('Error creating cuisine style');
    }
  }
}
