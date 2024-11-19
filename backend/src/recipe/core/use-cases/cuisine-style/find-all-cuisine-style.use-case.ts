import { ICuisineStyle } from '../../interfaces/cuisine-style/cousine-styles.interface';
import { ICuisineStyleRepository } from '../../interfaces/repositories/cuisine-style.repository';
import { IPaginatedResponse } from '../../interfaces/shared/paginated-response.interface';

export class FindAllCuisineStyleUseCase {
  constructor(
    private readonly cuisineStyleRepository: ICuisineStyleRepository,
  ) {}

  async execute({
    name,
    page,
    limit,
  }: {
    name: string;
    page: number;
    limit: number;
  }): Promise<IPaginatedResponse<ICuisineStyle>> {
    const offset = (page - 1) * limit;
    const numericLimit = parseInt(limit.toString(), 10);

    const cuisineStyles = await this.cuisineStyleRepository.findAll({
      name,
      offset,
      limit: numericLimit,
    });

    return {
      data: cuisineStyles.data,
      page: page,
      limit: limit,
      total: cuisineStyles.total,
    };
  }
}
