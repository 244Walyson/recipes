import { log } from 'console';
import { DuplicateresourceException } from '../exceptions/duplicate-resource.exception';
import { ResourceNotFoundException } from '../exceptions/resource-not-found.exception';
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
        throw new DuplicateresourceException(
          'User with this email already exists',
        );
      }
      const user = UserMapper.toEntity(dto);
      return UserMapper.toDTO(await this.userRepository.update(id, user));
    } catch (error) {
      log(error);
      throw new ResourceNotFoundException('User not found');
    }
  }
}
