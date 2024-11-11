import { DomainException } from '../exceptions/domain.exception';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { IUserResponse } from '../interfaces/user-response.interface';
import { UserMapper } from '../mappers/user.mapper';

export class FindUserByIdlUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<IUserResponse> {
    const userExists = await this.userRepository.findById(id);
    if (userExists) {
      throw new DomainException('User Not Found');
    }
    return UserMapper.toDTO(userExists);
  }
}
