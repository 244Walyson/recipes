import { DomainException } from '../exceptions/domain.exception';
import { IPasswordEncoder } from '../interfaces/password-encoder.interface';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { IUserRequest } from '../interfaces/user-request.interface';
import { IUserResponse } from '../interfaces/user-response.interface';
import { UserMapper } from '../mappers/user.mapper';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordEncoder: IPasswordEncoder,
  ) {}

  async execute(dto: IUserRequest): Promise<IUserResponse> {
    const userExists = await this.userRepository.findByEmail(dto.email);
    if (userExists) {
      throw new DomainException('User with this email already exists');
    }
    const password = await this.passwordEncoder.encode(dto.password);
    const user = UserMapper.toEntity(dto);
    user.password = password;
    return UserMapper.toDTO(await this.userRepository.create(user));
  }
}
