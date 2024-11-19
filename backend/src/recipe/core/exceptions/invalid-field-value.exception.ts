export class RecipeInvalidFieldValueException extends Error {
  private readonly errors: Record<string, string>[];

  constructor(errors: Record<string, string>[]) {
    super(RecipeInvalidFieldValueException.formatErrors(errors));
    this.name = RecipeInvalidFieldValueException.name;
    this.errors = errors;
  }

  static formatErrors(errors: Record<string, string>[]): string {
    return errors.map((error) => Object.values(error).join(': ')).join(', ');
  }

  getErrorMessages(): string[] {
    return this.errors.map((error) => Object.values(error).join(': '));
  }
}
