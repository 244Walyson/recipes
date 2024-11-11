export class InvalidFieldValueException extends Error {
  constructor(fieldName: string, message: string) {
    super(`Invalid value for field ${fieldName}: ${message}`);
    this.name = 'InvalidFieldValueException';
  }
}
