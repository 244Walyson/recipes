export class RecipeDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = RecipeDomainException.name;
  }
}
