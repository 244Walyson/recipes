import { CuisineStyle } from '../../entities/cuisine-style.entity';
import { RecipeDomainException } from '../../exceptions/domain.exception';
import { ICuisineStyle } from '../../interfaces/cuisine-style/cousine-styles.interface';
import { ICuisineStyleRepository } from '../../interfaces/repositories/cuisine-style.repository';

export class CreateCuisineStyleUseCase {
  constructor(
    private readonly cuisineStyleRepository: ICuisineStyleRepository,
  ) {}

  async execute(dto: ICuisineStyle): Promise<ICuisineStyle> {
    const cuisineStyle = new CuisineStyle(dto);
    try {
      return await this.cuisineStyleRepository.create(cuisineStyle);
    } catch (error) {
      console.log(error);
      throw new RecipeDomainException('Error creating cuisine style');
    }
  }
}
