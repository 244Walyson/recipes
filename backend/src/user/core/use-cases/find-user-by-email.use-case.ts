import { User } from '@prisma/client';
import { UserResourceNotFoundException } from '../exceptions/resource-not-found.exception';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';

export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);
    if (!userExists) {
      throw new UserResourceNotFoundException('User Not Found');
    }
    return userExists;
  }
}
