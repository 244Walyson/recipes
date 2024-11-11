import { IPasswordEncoder } from '../interfaces/utils/password-encoder.interface';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';
import { IUserRequest } from '../interfaces/user/user-request.interface';
import { IUserResponse } from '../interfaces/user/user-response.interface';
import { UserMapper } from '../mappers/user.mapper';
import { DuplicateresourceException } from '../exceptions/duplicate-resource.exception';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordEncoder: IPasswordEncoder,
  ) {}

  async execute(dto: IUserRequest): Promise<IUserResponse> {
    const userExists = await this.userRepository.findByEmail(dto.email);
    if (userExists) {
      throw new DuplicateresourceException(
        'User with this email already exists',
      );
    }
    const password = await this.passwordEncoder.encode(dto.password);
    const user = UserMapper.toEntity(dto);
    user.password = password;
    return UserMapper.toDTO(await this.userRepository.create(user));
  }
}
