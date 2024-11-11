import { DomainException } from '../exceptions/domain.exception';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { IUserResponse } from '../interfaces/user-response.interface';
import { UserMapper } from '../mappers/user.mapper';

export class FindUserByEmailUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<IUserResponse> {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new DomainException('User Not Found');
    }
    return UserMapper.toDTO(userExists);
  }
}
