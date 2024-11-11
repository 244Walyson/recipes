import { ResourceNotFoundException } from '../exceptions/resource-not-found.exception';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';
import { IUserResponse } from '../interfaces/user/user-response.interface';
import { UserMapper } from '../mappers/user.mapper';

export class FindUserByEmailUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<IUserResponse> {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new ResourceNotFoundException('User Not Found');
    }
    return UserMapper.toDTO(userExists);
  }
}
