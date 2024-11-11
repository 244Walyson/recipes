import { RecoverPassword } from '../../entities/recover-password.entity';

export interface IRecoveryPasswordRepository {
  create(recoveryPassword: RecoverPassword): Promise<RecoverPassword>;
  revoke(id: string): void;
  findOne(token: string, email: string): Promise<RecoverPassword>;
}
