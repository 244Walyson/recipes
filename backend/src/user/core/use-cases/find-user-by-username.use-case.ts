import { User } from '@prisma/client';
import { UserResourceNotFoundException } from '../exceptions/resource-not-found.exception';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';

export class FindUserByUsernameUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(username: string): Promise<User> {
    const userExists = await this.userRepository.findByUsername(username);
    if (!userExists) {
      throw new UserResourceNotFoundException('User Not Found');
    }
    return userExists;
  }
}
