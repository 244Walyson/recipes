export class RecipeDuplicateresourceException extends Error {
  constructor(message: string) {
    super(message);
    this.name = RecipeDuplicateresourceException.name;
  }
}
