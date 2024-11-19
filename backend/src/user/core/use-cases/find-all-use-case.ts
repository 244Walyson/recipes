import { IUserRepository } from '../interfaces/repositories/user-repository.interface';
import { IUserPaginated } from '../interfaces/user/user-paginated.interface';

interface FindAllParams {
  name?: string;
  page: number;
  limit: number;
}

export class FindAllUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ name, page, limit }: FindAllParams): Promise<IUserPaginated> {
    const offset = (page - 1) * limit;
    const pageSize = parseInt(limit as any, 10);
    const { users, total } = await this.userRepository.findAll({
      name,
      offset,
      limit: pageSize,
    });
    return {
      data: users,
      total,
      page,
      limit,
    };
  }
}
