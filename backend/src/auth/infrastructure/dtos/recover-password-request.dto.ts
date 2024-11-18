import { IRecoverPasswordRequest } from 'src/auth/core/interfaces/recover-password/recover-password-request.interface';

export class RecovrePassordRequestDto implements IRecoverPasswordRequest {
  token: string;
  email: string;
  password: string;
}
