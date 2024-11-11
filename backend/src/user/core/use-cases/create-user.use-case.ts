import { User } from '../entities/user.entity';
import { DomainException } from '../exceptions/domain.exception';
import { IUserRepository } from '../interfaces/user-repository.interface';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(user: User): Promise<User> {
    const userExists = await this.userRepository.findByEmail(user.email);
    if (userExists) {
      throw new DomainException('User with this email already exists');
    }
    return this.userRepository.create(user);
  }
}
