import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { CreateUserUseCase } from './core/use-cases/create-user.use-case';
import { UserRepository } from './infrastructure/repositories/user.repository.impl';
import { ControllerAdvice } from './infrastructure/controllers/controller-advice/controller.advice';
import { PrismaService } from 'src/utils/prisma.service';
import { IUserRepository } from './core/interfaces/user-repository.interface';

@Module({
  controllers: [UserController],
  providers: [
    ControllerAdvice,
    PrismaService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new CreateUserUseCase(userRepository);
      },
      inject: ['IUserRepository'],
    },
  ],
})
export class UserModule {}
