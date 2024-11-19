export class RecipeInvalidFieldValueException extends Error {
  constructor(errors: Record<string, string>[]) {
    super(errors.toString());
    this.name = RecipeInvalidFieldValueException.name;
  }
}
