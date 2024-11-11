import { Module } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { CreateAccessTokenUseCase } from './core/use-cases/create-access-token-use-case';
import { FindUserByEmailUserUseCase } from 'src/user/core/use-cases/find-user-by-email.use-case';
import { IJwtService } from './core/interfaces/jwt/jwt.service.interface';
import { IPasswordEncoder } from 'src/user/core/interfaces/utils/password-encoder.interface';
import { CreateRefreshTokenUseCase } from './core/use-cases/create-refresh-toke.use-case';
import { PasswordEncoder } from 'src/user/infrastructure/utils/password-encoder.impl';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './core/contants/jwt-contants';
import { JwtServiceImpl } from './infrastructure/utils/jwt.service';
import { RefreshTokenUseCase } from './core/use-cases/refresh-token.use-case';
import { RefreshTokenRepository } from './infrastructure/repositories/refresh-token-repository.impl';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { UserModule } from 'src/user/user.module';
import { CreateRecoverPasswordTokenUseCase } from './core/use-cases/create-recover-password-token.use-case';
import { IRecoveryPasswordRepository } from './core/interfaces/repositories/recovery-password.repository';
import { IEmailService } from './core/interfaces/recover-password/email-service.interface';
import { UpdatePasswordUseCase } from './core/use-cases/update-password.use-case';
import { UpdateUserUseCase } from 'src/user/core/use-cases/update-user.use-case';
import { NodeMailerService } from './infrastructure/utils/nodemailer.service';
import { RecoveryPasswordRepository } from './infrastructure/repositories/recovery-password.repository.impl';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: 'IPasswordEncoder',
      useClass: PasswordEncoder,
    },
    {
      provide: 'IRefreshTokenRepository',
      useClass: RefreshTokenRepository,
    },
    {
      provide: 'IJwtService',
      useClass: JwtServiceImpl,
    },
    {
      provide: 'IRecoveryPasswordRepository',
      useClass: RecoveryPasswordRepository,
    },
    {
      provide: 'IEmailService',
      useClass: NodeMailerService,
    },
    {
      provide: CreateAccessTokenUseCase,
      useFactory: (
        findUserByEmail: FindUserByEmailUserUseCase,
        jwtService: IJwtService,
        passwordEncoder: IPasswordEncoder,
        createRefreshTokenUseCase: CreateRefreshTokenUseCase,
      ) => {
        return new CreateAccessTokenUseCase(
          findUserByEmail,
          jwtService,
          passwordEncoder,
          createRefreshTokenUseCase,
        );
      },
      inject: [
        FindUserByEmailUserUseCase,
        'IJwtService',
        'IPasswordEncoder',
        CreateRefreshTokenUseCase,
      ],
    },
    {
      provide: CreateRefreshTokenUseCase,
      useFactory: (refreshTokenRepository: RefreshTokenRepository) => {
        return new CreateRefreshTokenUseCase(refreshTokenRepository);
      },
      inject: ['IRefreshTokenRepository'],
    },
    {
      provide: RefreshTokenUseCase,
      useFactory: (
        refreshTokenRepository: RefreshTokenRepository,
        createRefreshTokenUseCase: CreateAccessTokenUseCase,
      ) => {
        return new RefreshTokenUseCase(
          refreshTokenRepository,
          createRefreshTokenUseCase,
        );
      },
      inject: ['IRefreshTokenRepository', CreateAccessTokenUseCase],
    },
    {
      provide: UpdatePasswordUseCase,
      useFactory: (
        recoverPasswordRepository: IRecoveryPasswordRepository,
        findByEmailUseCase: FindUserByEmailUserUseCase,
        passwordEncoder: PasswordEncoder,
        updateUserUseCase: UpdateUserUseCase,
      ) => {
        return new UpdatePasswordUseCase(
          recoverPasswordRepository,
          findByEmailUseCase,
          passwordEncoder,
          updateUserUseCase,
        );
      },
      inject: [
        'IRecoveryPasswordRepository',
        FindUserByEmailUserUseCase,
        'IPasswordEncoder',
        UpdateUserUseCase,
      ],
    },
    {
      provide: CreateRecoverPasswordTokenUseCase,
      useFactory: (
        recoveryPasswordRepository: IRecoveryPasswordRepository,
        findByEmailUseCase: FindUserByEmailUserUseCase,
        emailService: IEmailService,
      ) => {
        return new CreateRecoverPasswordTokenUseCase(
          recoveryPasswordRepository,
          findByEmailUseCase,
          emailService,
        );
      },
      inject: [
        'IRecoveryPasswordRepository',
        FindUserByEmailUserUseCase,
        'IEmailService',
      ],
    },
  ],
})
export class AuthModule {}
