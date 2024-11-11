import { FindUserByEmailUserUseCase } from 'src/user/core/use-cases/find-user-by-email.use-case';
import { IRecoverPasswordRequest } from '../interfaces/recover-password/recover-password-request.interface';
import { PasswordEncoder } from 'src/user/infrastructure/utils/password-encoder.impl';
import { UpdateUserUseCase } from 'src/user/core/use-cases/update-user.use-case';
import { IRecoveryPasswordRepository } from '../interfaces/repositories/recovery-password.repository';
import { ResourceNotFoundException } from 'src/user/core/exceptions/resource-not-found.exception';
import { RecoverPassword } from '../entities/recover-password.entity';
import { UnauthorizedException } from '../exceptions/unuthorized.exceptions';

export class UpdatePasswordUseCase {
  constructor(
    private readonly recoverPasswordRepository: IRecoveryPasswordRepository,
    private readonly findByEmailUseCase: FindUserByEmailUserUseCase,
    private readonly passwordEncoder: PasswordEncoder,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  async execute(dto: IRecoverPasswordRequest): Promise<void> {
    const recoverToken = await this.getRecoverToken(dto.token, dto.email);
    this.validateRecoverToken(recoverToken);

    const user = await this.findByEmailUseCase.execute(dto.email);
    user.password = await this.passwordEncoder.encode(dto.newPassword);

    this.updateUserUseCase.execute(user.id, user);
    this.recoverPasswordRepository.revoke(recoverToken.id);
  }

  private async getRecoverToken(token, email): Promise<RecoverPassword> {
    const recoverToken = await this.recoverPasswordRepository.findOne(
      token,
      email,
    );

    if (!recoverToken) {
      throw new ResourceNotFoundException('Invalid Reccover token');
    }

    return recoverToken;
  }

  private validateRecoverToken(recovertoken: RecoverPassword) {
    if (recovertoken.revoked) {
      throw new UnauthorizedException('Recover Token revoked');
    }
    const isExpired = recovertoken.expiresAt > BigInt(new Date().getTime());
    if (isExpired) {
      throw new UnauthorizedException('Recover Token expired');
    }
  }
}
