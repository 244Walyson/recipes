export class RecipeInvalidFieldValueException extends Error {
  constructor(fieldName: string, message: string) {
    super(`Invalid value for field ${fieldName}: ${message}`);
    this.name = RecipeInvalidFieldValueException.name;
  }
}
