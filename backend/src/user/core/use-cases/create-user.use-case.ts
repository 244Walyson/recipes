import { IPasswordEncoder } from '../../../auth/core/interfaces/utils/password-encoder.interface';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';
import { IUserRequest } from '../interfaces/user/user-request.interface';
import { IUserResponse } from '../interfaces/user/user-response.interface';
import { UserMapper } from '../mappers/user.mapper';
import { UserDuplicateresourceException } from '../exceptions/duplicate-resource.exception';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordEncoder: IPasswordEncoder,
  ) {}

  async execute(dto: IUserRequest): Promise<IUserResponse> {
    const userExists = await this.userRepository.findByEmail(dto.email);
    if (userExists) {
      throw new UserDuplicateresourceException(
        'User with this email already exists',
      );
    }
    const password = await this.passwordEncoder.encode(dto.password);
    const user = UserMapper.toEntity(dto);
    user.password = password;
    return UserMapper.toDTO(await this.userRepository.create(user));
  }
}
