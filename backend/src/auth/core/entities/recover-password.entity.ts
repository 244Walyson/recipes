export class RecoverPassword {
  id: string;
  token: string;
  userId: string;
  expiresAt: number;
  email: string;
  revoked: boolean = false;

  constructor(partial: Partial<RecoverPassword>) {
    this.id = partial.id ?? crypto.randomUUID();
    this.expiresAt = new Date().getTime() + 1000 * 60 * 30;
    Object.assign(this, partial);
  }
}
