import { IUserRepository } from '../interfaces/repositories/user-repository.interface';
import { IUserPaginated } from '../interfaces/user/user-paginated.interface';
import { UserMapper } from '../mappers/user.mapper';

interface FindAllParams {
  name?: string;
  page: number;
  limit: number;
}

export class FindAllUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ name, page, limit }: FindAllParams): Promise<IUserPaginated> {
    const offset = (page - 1) * limit;
    const { users, total } = await this.userRepository.findAll({
      name,
      offset,
      limit,
    });
    const data = UserMapper.toProjectionList(users);
    return {
      data,
      total,
      page,
      limit,
    };
  }
}
