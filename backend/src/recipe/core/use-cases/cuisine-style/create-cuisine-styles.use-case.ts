import { DomainException } from '../../exceptions/domain.exception';
import { ICuisineStyle } from '../../interfaces/cuisine-style/cousine-styles.interface';
import { ICuisineStyleRepository } from '../../interfaces/repositories/cuisine-style.repository';

export class CreateCuisineStyleUseCase {
  constructor(private cuisineStyleRepository: ICuisineStyleRepository) {}

  async execute(dto: ICuisineStyle): Promise<ICuisineStyle> {
    try {
      return await this.cuisineStyleRepository.create(dto);
    } catch (error) {
      console.error(error);
      throw new DomainException('Error creating cuisine style');
    }
  }
}
