import { IRecoverPasswordRequest } from 'src/auth/core/interfaces/recover-password/recover-password-request.interface';

export class RecovrePassordRequestDto implements IRecoverPasswordRequest {
  token: string;
  userId: string;
  email: string;
}
