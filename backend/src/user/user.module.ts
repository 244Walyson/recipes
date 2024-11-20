import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { CreateUserUseCase } from './core/use-cases/create-user.use-case';
import { UserRepository } from './infrastructure/repositories/user.repository.impl';
import { PrismaService } from 'src/utils/prisma.service';
import { IUserRepository } from './core/interfaces/repositories/user-repository.interface';
import { IPasswordEncoder } from '../auth/core/interfaces/utils/password-encoder.interface';
import { FindUserByEmailUseCase } from './core/use-cases/find-user-by-email.use-case';
import { FindUserByIdlUserUseCase } from './core/use-cases/find-user-by-id.use-case';
import { UpdateUserUseCase } from './core/use-cases/update-user.use-case';
import { FindAllUseCase } from './core/use-cases/find-all-use-case';
import { AuthModule } from 'src/auth/auth.module';
import { FollowUserByIdUseCase } from './core/use-cases/follow-user-by-id.use-case';
import { UnfollowUserByIdUseCase } from './core/use-cases/unfollow-user-by-id.use-case';
import { FindFollowingUsersUseCase } from './core/use-cases/find-following-users.use-case';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepository: IUserRepository,
        passwordEncoder: IPasswordEncoder,
      ) => {
        return new CreateUserUseCase(userRepository, passwordEncoder);
      },
      inject: ['IUserRepository', 'IPasswordEncoder'],
    },
    {
      provide: FindUserByEmailUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new FindUserByEmailUseCase(userRepository);
      },
      inject: ['IUserRepository'],
    },
    {
      provide: FindUserByIdlUserUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new FindUserByIdlUserUseCase(userRepository);
      },
      inject: ['IUserRepository'],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new UpdateUserUseCase(userRepository);
      },
      inject: ['IUserRepository'],
    },
    {
      provide: FindAllUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new FindAllUseCase(userRepository);
      },
      inject: ['IUserRepository'],
    },
    {
      provide: FollowUserByIdUseCase,
      useFactory: (
        userRepository: IUserRepository,
        findUserByIdUserCase: FindUserByIdlUserUseCase,
        updateUserUseCase: UpdateUserUseCase,
      ) => {
        return new FollowUserByIdUseCase(
          userRepository,
          findUserByIdUserCase,
          updateUserUseCase,
        );
      },
      inject: ['IUserRepository', FindUserByIdlUserUseCase, UpdateUserUseCase],
    },
    {
      provide: UnfollowUserByIdUseCase,
      useFactory: (
        userRepository: IUserRepository,
        findUserByIdUserCase: FindUserByIdlUserUseCase,
        updateUserUseCase: UpdateUserUseCase,
      ) => {
        return new UnfollowUserByIdUseCase(
          userRepository,
          findUserByIdUserCase,
          updateUserUseCase,
        );
      },
      inject: ['IUserRepository', FindUserByIdlUserUseCase, UpdateUserUseCase],
    },
    {
      provide: FindFollowingUsersUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new FindFollowingUsersUseCase(userRepository);
      },
      inject: ['IUserRepository'],
    },
  ],
  exports: [CreateUserUseCase, FindUserByEmailUseCase, UpdateUserUseCase],
})
export class UserModule {}
