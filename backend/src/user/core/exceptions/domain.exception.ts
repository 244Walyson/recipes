export class UserDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = UserDomainException.name;
  }
}
