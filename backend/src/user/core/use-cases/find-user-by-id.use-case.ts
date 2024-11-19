import { UserResourceNotFoundException } from '../exceptions/resource-not-found.exception';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';
import { IUserResponse } from '../interfaces/user/user-response.interface';

export class FindUserByIdlUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<IUserResponse> {
    try {
      return await this.userRepository.findById(id);
    } catch {
      throw new UserResourceNotFoundException('User Not Found');
    }
  }
}
