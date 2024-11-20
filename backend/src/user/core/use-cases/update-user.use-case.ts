import { UserDomainException } from '../exceptions/domain.exception';
import { UserResourceNotFoundException } from '../exceptions/resource-not-found.exception';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';
import { IUserRequest } from '../interfaces/user/user-request.interface';
import { IUserResponse } from '../interfaces/user/user-response.interface';
import { UserMapper } from '../mappers/user.mapper';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, dto: IUserRequest): Promise<IUserResponse> {
    try {
      const userExists = await this.userRepository.findById(id);
      if (!userExists) {
        throw new UserResourceNotFoundException(`User not found: ${id}`);
      }
      const user = UserMapper.toEntity(dto);
      return await this.userRepository.update(id, user);
    } catch (error) {
      console.log(error);
      throw new UserDomainException('Error updating user');
    }
  }
}
