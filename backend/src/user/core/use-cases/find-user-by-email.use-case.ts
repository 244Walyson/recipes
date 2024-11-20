import { UserResourceNotFoundException } from '../exceptions/resource-not-found.exception';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';
import { IUserResponse } from '../interfaces/user/user-response.interface';

export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<IUserResponse> {
    const userExists = await this.userRepository.findByEmail(email);
    if (!userExists) {
      throw new UserResourceNotFoundException(`User Not Found ${email}`);
    }
    return userExists;
  }
}
