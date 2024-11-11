import { DomainException } from '../exceptions/domain.exception';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { IUserRequest } from '../interfaces/user-request.interface';
import { IUserResponse } from '../interfaces/user-response.interface';
import { UserMapper } from '../mappers/user.mapper';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: IUserRequest): Promise<IUserResponse> {
    const userExists = await this.userRepository.findByEmail(dto.email);
    if (userExists) {
      throw new DomainException('User with this email already exists');
    }
    const user = UserMapper.toEntity(dto);
    return UserMapper.toDTO(await this.userRepository.create(user));
  }
}
