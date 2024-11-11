import { User } from '@prisma/client';
import { ResourceNotFoundException } from '../exceptions/resource-not-found.exception';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';

export class FindUserByEmailUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);
    if (!userExists) {
      console.log();
      throw new ResourceNotFoundException('User Not Found');
    }
    return userExists;
  }
}
