import { UserResourceNotFoundException } from '../exceptions/resource-not-found.exception';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';
import { IUserResponse } from '../interfaces/user/user-response.interface';
import { UserMapper } from '../mappers/user.mapper';

export class FindUserByIdlUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<IUserResponse> {
    try {
      const userExists = await this.userRepository.findById(id);
      return UserMapper.toDTO(userExists);
    } catch {
      throw new UserResourceNotFoundException('User Not Found');
    }
  }
}
