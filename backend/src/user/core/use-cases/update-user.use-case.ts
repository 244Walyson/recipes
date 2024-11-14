import { UserDuplicateresourceException } from '../exceptions/duplicate-resource.exception';
import { UserResourceNotFoundException } from '../exceptions/resource-not-found.exception';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';
import { IUserRequest } from '../interfaces/user/user-request.interface';
import { IUserResponse } from '../interfaces/user/user-response.interface';
import { UserMapper } from '../mappers/user.mapper';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, dto: IUserRequest): Promise<IUserResponse> {
    try {
      const userExists = await this.userRepository.findByEmail(id);
      if (userExists) {
        throw new UserDuplicateresourceException(
          'User with this email already exists',
        );
      }
      const user = UserMapper.toEntity(dto);
      return UserMapper.toDTO(await this.userRepository.update(id, user));
    } catch {
      throw new UserResourceNotFoundException('User not found');
    }
  }
}
