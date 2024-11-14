export class RecipeResourceNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = RecipeResourceNotFoundException.name;
  }
}
