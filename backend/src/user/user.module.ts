import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { CreateUserUseCase } from './core/use-cases/create-user.use-case';
import { UserRepository } from './infrastructure/repositories/user.repository.impl';
import { ControllerAdvice } from './infrastructure/controllers/controller-advice/controller.advice';
import { PrismaService } from 'src/utils/prisma.service';
import { IUserRepository } from './core/interfaces/repositories/user-repository.interface';
import { PasswordEncoder } from '../auth/infrastructure/utils/password-encoder.service';
import { IPasswordEncoder } from '../auth/core/interfaces/utils/password-encoder.interface';
import { FindUserByEmailUserUseCase } from './core/use-cases/find-user-by-email.use-case';
import { FindUserByIdlUserUseCase } from './core/use-cases/find-user-by-id.use-case';
import { UpdateUserUseCase } from './core/use-cases/update-user.use-case';
import { FindAllUseCase } from './core/use-cases/find-all-use-case';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [
    ControllerAdvice,
    PrismaService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IPasswordEncoder',
      useClass: PasswordEncoder,
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
      provide: FindUserByEmailUserUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new FindUserByEmailUserUseCase(userRepository);
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
  ],
  exports: [FindUserByEmailUserUseCase, UpdateUserUseCase],
})
export class UserModule {}
